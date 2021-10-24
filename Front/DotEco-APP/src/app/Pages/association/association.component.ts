import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Association } from 'src/app/_models/Association';
import { AssociationService } from 'src/app/_services/association.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

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

  mode = 'post';
  _filterList = '';
  bodyDeleteAssociation = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private localeService: BsLocaleService,
    private associationService: AssociationService,
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
    this.validation();
    this.getAssociation();
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

  getAssociation() {
    this.associationService.getAllAssociation().subscribe(
      (_associations: Association[]) => {
        this.associations = _associations;
        this.associationsFilters = this.associations;
      }, error => {
        this.toastr.error(`Erro ao tentar Carregar Associações: ${error}`);
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
