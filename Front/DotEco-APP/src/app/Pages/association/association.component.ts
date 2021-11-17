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

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})

export class AssociationComponent implements OnInit {
  titulo = 'Associações';

  associationForm: FormGroup;
  associationsFilters: Association[];
  _association: Association[] = [];
  associations: Association[];
  association: Association;
  userUpdate = {} as UserUpdate;

  mode = 'post';
  _filterList = '';
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

  get filterList(): string {
    return this._filterList;
  }
  set filterList(value: string) {
    this._filterList = value;
    this.associationsFilters = this.filterList ? this.filterAssociations(this.filterList) : this.associations;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.validation();
    this.getAssociation();
    this.carregarUsuario();
  }

  openModal(template: any) {
    this.associationForm.reset();
    template.show();
  }

  validation() {
    this.associationForm = this.fb.group({
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
          console.log(userRetorno);
          this.userUpdate = userRetorno;
          this.toaster.success('Usuário Carregado', 'Sucesso');
        },
        (error) => {
          console.error(error);
          this.toaster.error('Usuário não Carregado', 'Erro');
          this.router.navigate(['/dashboard']);
        }
      )
      .add(() => this.spinner.hide());
  }


  filterAssociations(filterFor: string): Association[] {
    filterFor = filterFor.toLocaleLowerCase();
    return this.associations.filter(
      association => association.name.toLocaleLowerCase().indexOf(filterFor) !== -1
    );
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
    this.bodyDeleteAssociation = `Tem certeza que deseja excluir o Evento: ${association.name}, Código: ${association.id}`;
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
    this.associationService.getAllAssociation().subscribe({
      next: (associations: Association[]) => {
        this.associations = associations;
        this.associationsFilters = this.associations;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar as Associações', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });
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

}
