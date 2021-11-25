import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Association } from 'src/app/_models/Association';
import { AssociationService } from 'src/app/_services/association.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserUpdate } from 'src/app/_models/Identity/UserUpdate';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/Identity/User';
import { Observable, Subject } from 'rxjs';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { etLocale } from 'ngx-bootstrap/chronos';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})

export class AssociationComponent implements OnInit {
  pagination = {} as Pagination;

  associationForm: FormGroup;
  _association: Association[] = [];
  associations: Association[];
  association: Association;
  userUpdate = {} as UserUpdate;
  userId: Observable<User[]>;

  mode = 'post';
  bodyDeleteAssociation = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private localeService: BsLocaleService,
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
    this.getAssociation();
    this.carregarUsuario();
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;
    this.userId = this.accountService.getAllUser();
  }

  openModal(template: any) {
    this.associationForm.reset();
    template.show();
  }

  validation() {
    this.associationForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      cep: ['', Validators.required],
      cnpj: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
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
          this.router.navigate(['/dashboard']);
        }
      ).add(() => this.spinner.hide());
  }

  termSearchChanged: Subject<string> = new Subject<string>();

  public filterAssociations(evt: any): void {
    if (this.termSearchChanged.observers.length === 0) {
      this.termSearchChanged.pipe(debounceTime(2500)).subscribe(
        filterFor => {
          this.spinner.show();
          this.associationService.getAllAssociation(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filterFor
          ).subscribe(
            (paginatedResult: PaginatedResult<Association[]>) => {
              this.associations = paginatedResult.result;
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

  newAssociation(template: any) {
    this.mode = 'post';
    this.openModal(template);
  }

  editAssociation(association: Association, template: any) {
    this.mode = 'put';
    this.openModal(template);
    this.association = Object.assign({}, association);
    this.associationForm.patchValue(this.association);
  }

  deleteAssociation(association: Association, template: any) {
    this.openModal(template);
    this.association = association;
    this.bodyDeleteAssociation = `Tem certeza que deseja excluir o Evento: ${association.userId}, Código: ${association.id}`;
  }

  confirmDelete(template: any) {
    this.associationService.deleteAssociation(this.association.id).subscribe(
      () => {
        template.hide();
        this.getAssociation();
        this.toastr.success('Deletado com Sucesso');
      }, error => {
        this.toastr.error('Erro ao tentar Deletar');
        console.log(error);
      }
    );
  }

  public getAssociation(): void {
    this.spinner.show();
    this.associationService.getAllAssociation(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe(
        (paginatedResult: PaginatedResult<Association[]>) => {
          this.associations = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar as Associações', 'Erro!');
        },
      ).add(() => this.spinner.hide());
  }

  saveAlteration(template: any) {
    if (this.associationForm.valid) {
      if (this.mode === 'post') {
        this.association = Object.assign({}, this.associationForm.value);
        this.associationService.postAssociation(this.association).subscribe(
          (newAssociation: Association) => {
            template.hide();
            this.getAssociation();
            this.toastr.success('Inserido com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Inserir: ${error}`);
          }
        );
      } else {
        this.association = Object.assign({ id: this.association.id }, this.associationForm.value);

        this.associationService.putAssociation(this.association).subscribe(
          () => {
            template.hide();
            this.getAssociation();
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
    this.getAssociation();
  }

}
