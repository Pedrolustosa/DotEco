import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CollectionData, StatusClient, StatusPoint } from 'src/app/_models/CollectionData';
import { CollectionDataService } from 'src/app/_services/collectiondata.service';
import { Association } from 'src/app/_models/Association';
import { AssociationService } from 'src/app/_services/association.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserUpdate } from 'src/app/_models/Identity/UserUpdate';
import { AccountService } from 'src/app/_services/account.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/Identity/User';

@Component({
  selector: 'app-collectiondata',
  templateUrl: './collectiondata.component.html',
  styleUrls: ['./collectiondata.component.css']
})
export class CollectionDataComponent implements OnInit {
  p: number = 1;
  collectiondataForm: FormGroup;
  form!: FormGroup;
  collectiondatasFilters: CollectionData[];
  collectiondatas: CollectionData[];
  collectiondata: CollectionData;
  associationId: Observable<Association[]>;
  userUpdate = {} as UserUpdate;
  userId: Observable<User[]>;
  statusEnum = StatusClient;
  statusPoint = StatusPoint;
  association = {} as Association;

  mode = 'post';
  _filterList = '';
  bodyDeleteCollectionData = '';
  collectiondataAssociation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private localeService: BsLocaleService,
    private collectiondataService: CollectionDataService,
    private associationService: AssociationService,
    public accountService: AccountService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.spinner.show();
    this.validation();
    this.carregarUsuario();
    this.userId = this.accountService.getAllUser();
    this.associationId = this.associationService.getAllAssociation();
  }

  openModal(template: any) {
    this.collectiondataForm.reset();
    template.show();
  }

  private validation(): void {
    this.collectiondataForm = this.fb.group({
      email: [''],
      userId: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      cep: ['', Validators.required],
      reference: ['', Validators.required],
      telephone: ['', Validators.required],
      typeCollection: ['', Validators.required],
      date: ['', Validators.nullValidator],
      associationId: ['', Validators.required],
      statusPoint: ['', Validators.nullValidator],
      statusClient: ['', Validators.nullValidator],
      statusAssociation: ['', Validators.nullValidator],
    });
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService
      .getUser()
      .subscribe(
        (userRetorno: UserUpdate) => {
          this.userUpdate = userRetorno;
          this.getCollectionData();
        },
        (error) => {
          console.error(error);
          this.toaster.error('Usu??rio n??o Carregado', 'Erro');
          this.router.navigate(['/Home']);
        }
      )
      .add(() => this.spinner.hide());
  }

  newCollectionData(template: any) {
    this.mode = 'post';
    this.openModal(template);
  }

  editCollectionData(collectiondata: CollectionData, template: any) {
    this.mode = 'put';
    this.openModal(template);
    this.collectiondata = Object.assign({}, collectiondata);
    this.collectiondataForm.patchValue(this.collectiondata);
  }

  deleteCollectionData(collectiondata: CollectionData, template: any) {
    this.openModal(template);
    this.collectiondata = collectiondata;
    this.bodyDeleteCollectionData = `Tem certeza que deseja excluir a requisi????o: ${collectiondata.id} ?`;
  }

  confirmDelete(template: any) {
    this.collectiondataService.deleteCollectionData(this.collectiondata.id).subscribe(
      () => {
        template.hide();
        this.getCollectionData();
        this.toastr.success('Deletado com Sucesso');
      }, error => {
        this.toastr.error('Erro ao tentar Deletar');
        console.log(error);
      }
    );
  }

  public getCollectionData(): void {
    if (this.userUpdate.type === 1) {
      this.collectiondataService.getCollectionDataByUserId(this.userUpdate.id).subscribe({
        next: (collectiondata: CollectionData[]) => {
          this.collectiondatas = collectiondata;
          this.collectiondatasFilters = this.collectiondatas;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar as Coletas', 'Erro!');
        },
        complete: () => this.spinner.hide()
      });
    }
    if (this.userUpdate.type === 2) {
      this.collectiondataService.getCollectionDataByAssociationId(this.userUpdate.id).subscribe({
        next: (collectiondata: CollectionData[]) => {
          this.collectiondatas = collectiondata;
          this.collectiondatasFilters = this.collectiondatas;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar as Coletas', 'Erro!');
        },
        complete: () => this.spinner.hide()
      });
    }
  }

  onSubmit(): void {
    this.countPoints();
  }

  public countPoints(): void {
    this.spinner.show();
    this.userUpdate = { points: this.userUpdate.points += 1, ...this.userUpdate }
    this.accountService.updateUser(this.userUpdate).subscribe(
      () => this.toaster.success('Pontos atualizado!', 'Sucesso'),
      (error) => {
        this.toaster.error(error.error);
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

  saveAlteration(template: any) {
    if (this.collectiondataForm.valid) {
      if (this.mode === 'post') {
        this.collectiondata = Object.assign({}, this.collectiondataForm.value);
        this.collectiondata.userId = this.userUpdate.id;
        this.collectiondata.email = this.userUpdate.email;
        this.collectiondata.statusPoint = StatusPoint.NotRescued;
        this.collectiondataService.postCollectionData(this.collectiondata).subscribe(
          (newCollectionData: CollectionData) => {
            template.hide();
            this.getCollectionData();
            this.toastr.success('Inserido com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Inserir: ${error}`);
          }
        );
      } else {
        this.collectiondata = Object.assign({ id: this.collectiondata.id }, this.collectiondataForm.value);

        this.collectiondataService.putCollectionData(this.collectiondata).subscribe(
          () => {
            template.hide();
            this.getCollectionData();
            this.toastr.success('Editado com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}`);
          }
        );
      }
    }
  }

}

