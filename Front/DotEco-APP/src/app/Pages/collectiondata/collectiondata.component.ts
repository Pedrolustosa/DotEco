import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { CollectionData, StatusClient, StatusPoint } from 'src/app/_models/CollectionData';
import { CollectionDataService } from 'src/app/_services/collectiondata.service';
import { Association } from 'src/app/_models/Association';
import { AssociationService } from 'src/app/_services/association.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserUpdate } from 'src/app/_models/Identity/UserUpdate';
import { AccountService } from 'src/app/_services/account.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/Identity/User';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-collectiondata',
  templateUrl: './collectiondata.component.html',
  styleUrls: ['./collectiondata.component.css']
})
export class CollectionDataComponent implements OnInit {
  pagination = {} as Pagination;
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
  buttonHidden: boolean = true;

  mode = 'post';
  _filterList = '';
  bodyDeleteCollectionData = '';
  collectiondataAssociation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
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
    this.getCollectionData();
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;
    this.userId = this.accountService.getAllUser();
    this.associationId = this.associationService.getAllAssociations();
  }

  openModal(template: any) {
    this.collectiondataForm.reset();
    template.show();
  }

  private validation(): void {
    this.collectiondataForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      cep: ['', Validators.required],
      reference: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      typeCollection: ['', Validators.required],
      date: ['', Validators.nullValidator],
      associationId: ['', Validators.required],
      userId: ['', Validators.required],
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
        },
        (error) => {
          console.error(error);
          this.toaster.error('Usuário não Carregado', 'Erro');
          this.router.navigate(['/Home']);
        }
      )
      .add(() => this.spinner.hide());
  }

  termSearchChanged: Subject<string> = new Subject<string>();

  public filterCollectionData(evt: any): void {
    if (this.termSearchChanged.observers.length === 0) {
      this.termSearchChanged.pipe(debounceTime(2500)).subscribe(
        filterFor => {
          this.spinner.show();
          this.collectiondataService.getAllCollectionDatas(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filterFor
          ).subscribe(
            (paginatedResult: PaginatedResult<CollectionData[]>) => {
              this.collectiondatas = paginatedResult.result;
              this.pagination = paginatedResult.pagination;
            },
            (error: any) => {
              this.spinner.hide();
              this.toastr.error('Erro ao carregar as Associações', 'Erro!');
            }
          ).add(() => this.spinner.hide());
        }
      )
    }
    this.termSearchChanged.next(evt.value);
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
    this.bodyDeleteCollectionData = `Tem certeza que deseja excluir a requisição: ${collectiondata.id} ?`;
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
    this.spinner.show();
    this.collectiondataService.getAllCollectionDatas(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe(
        (paginatedResult: PaginatedResult<CollectionData[]>) => {
          this.collectiondatas = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar as Coletas', 'Erro!');
        },
      ).add(() => this.spinner.hide());
  }

  onSubmit(): void {
    this.countPoints();
  }

  public countPoints(): void {
    this.spinner.show();
    this.userUpdate.points += 1
    this.userUpdate.userName = this.userUpdate.userName
    this.userUpdate.type = this.userUpdate.type
    this.userUpdate.fullName = this.userUpdate.fullName
    this.userUpdate.cpf = this.userUpdate.cpf
    this.userUpdate.email = this.userUpdate.email
    this.userUpdate.password = this.userUpdate.password
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
        this.collectiondata = this.collectiondataForm.value;
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

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.getCollectionData();
  }

}

