import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Association } from 'src/app/_models/Association';
import { AssociationService } from 'src/app/_services/association.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserUpdate } from 'src/app/_models/Identity/UserUpdate';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/Identity/User';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})

export class AssociationComponent implements OnInit {
  p: number = 1;
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
    this.userId = this.accountService.getAllUser();
  }

  openModal(template: any) {
    this.associationForm.reset();
    template.show();
  }

  validation() {
    this.associationForm = this.fb.group({
      userId: [''],
      name: [''],
      cpfCnpj: [''],
      telephone: ['', Validators.required],
      cep: ['', Validators.required],
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
          this.router.navigate(['/home']);
        }
      ).add(() => this.spinner.hide());
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
    this.bodyDeleteAssociation = "Tem certeza que deseja tirar a sua associação ?";
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
        this.association.userId = this.userUpdate.id;
        this.association.name = this.userUpdate.fullName;
        this.association.cpfCnpj = this.userUpdate.cpfCnpj;
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
