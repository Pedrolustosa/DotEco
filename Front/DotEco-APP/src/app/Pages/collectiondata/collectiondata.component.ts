import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CollectionData } from 'src/app/_models/CollectionData';
import { CollectionDataService } from 'src/app/_services/collectiondata.service';
import { Association } from 'src/app/_models/Association';
import { AssociationService } from 'src/app/_services/association.service';

@Component({
  selector: 'app-collectiondata',
  templateUrl: './collectiondata.component.html',
  styleUrls: ['./collectiondata.component.css']
})
export class CollectionDataComponent implements OnInit {
  titulo = 'Requisições';

  collectiondataForm: FormGroup;
  collectiondatasFilters: CollectionData[];
  collectiondatas: CollectionData[];
  collectiondata: CollectionData;
  associationId: Observable<Association[]>;

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
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
    this.getCollectionData();
    this.associationId = this.associationService.getAllAssociation();
  }

  get filterList(): string {
    return this._filterList;
  }
  set filterList(value: string) {
    this._filterList = value;
    this.collectiondatasFilters = this.filterList ? this.filterCollectionDatas(this.filterList) : this.collectiondatas;
  }

  openModal(template: any) {
    this.collectiondataForm.reset();
    template.show();
  }

  validation() {
    this.collectiondataForm = this.fb.group({
      address: ['', Validators.required],
      cep: ['', Validators.required],
      reference: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      date: [''],
      associationId: ['', Validators.required],
    });
  }

  filterCollectionDatas(filterFor: string): CollectionData[] {
    filterFor = filterFor.toLocaleLowerCase();
    return this.collectiondatas.filter(
      collectiondata => collectiondata.cep.toLocaleLowerCase().indexOf(filterFor) !== -1
    );
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

  getCollectionData() {
    this.collectiondataService.getAllCollectionData().subscribe(
      (_collectiondata: CollectionData[]) => {
        this.collectiondatas = _collectiondata;
        this.collectiondatasFilters = this.collectiondatas;
        console.log(this.collectiondatas);
      }, error => {
        this.toastr.error(`Erro ao tentar Carregar Coletas: ${error}`);
      });
  }

  saveAlteration(template: any) {
    if (this.collectiondataForm.valid) {
      if (this.mode === 'post') {
        this.collectiondata = this.collectiondataForm.value;
        this.collectiondataService.postCollectionData(this.collectiondata).subscribe(
          (newCollectionData: CollectionData) => {
            template.hide();
            this.getCollectionData();
            console.log("collectiondataConfirm: ", this.collectiondata);
            this.toastr.success('Inserido com Sucesso!');
          }, error => {
            console.log("collectiondataError: ", this.collectiondata);
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

