import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Coupons, Status } from 'src/app/_models/Coupons';
import { User } from 'src/app/_models/Identity/User';
import { UserUpdate } from 'src/app/_models/Identity/UserUpdate';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { AccountService } from 'src/app/_services/account.service';
import { CouponsService } from 'src/app/_services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  pagination = {} as Pagination;
  couponsFilters: Coupons[];
  coupons: Coupons[];
  coupon: Coupons;
  userId: Observable<User[]>;
  status = Status;
  couponsForm: FormGroup;
  form!: FormGroup;
  user: User;
  userUpdate = {} as UserUpdate;
  mode = 'post';
  _filterList = '';
  bodyDeleteCoupons = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private localeService: BsLocaleService,
    private couponService: CouponsService,
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
    this.getCoupon();
    this.carregarUsuario();
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;
    this.userId = this.accountService.getAllUser();
  }

  openModal(template: any) {
    this.couponsForm.reset();
    template.show();
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
      )
      .add(() => this.spinner.hide());
  }

  validation() {
    this.couponsForm = this.fb.group({
      name: ['', Validators.required],
      percent: ['', Validators.required],
      userId: ['', Validators.nullValidator],
      companyId: ['', Validators.nullValidator],
      status: ['', Validators.nullValidator],
    });
  }

  newCoupons(template: any) {
    this.mode = 'post';
    this.openModal(template);
  }

  editCoupons(coupon: Coupons, template: any) {
    this.mode = 'put';
    this.openModal(template);
    this.coupon = Object.assign({}, coupon);
    this.couponsForm.patchValue(this.coupon);
  }

  deleteCoupons(coupon: Coupons, template: any) {
    this.openModal(template);
    this.coupon = coupon;
    this.bodyDeleteCoupons = `Tem certeza que deseja excluir o Cupom: ${this.coupon.name}, Código: ${this.coupon.id}`;
  }

  confirmDelete(template: any) {
    this.couponService.deleteCoupons(this.coupon.id).subscribe(
      () => {
        template.hide();
        this.getCoupon();
        this.toastr.success('Deletado com Sucesso');
      }, error => {
        this.toastr.error('Erro ao tentar Deletar');
        console.log(error);
      }
    );
  }

  public getCoupon(): void {
    this.spinner.show();
    this.couponService.getAllCoupons(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe(
        (paginatedResult: PaginatedResult<Coupons[]>) => {
          this.coupons = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar as Coletas', 'Erro!');
        },
      ).add(() => this.spinner.hide());
  }

  saveAlteration(template: any) {
    if (this.couponsForm.valid) {
      if (this.mode === 'post') {
        this.coupon = Object.assign({}, this.couponsForm.value);
        this.couponService.postCoupons(this.coupon).subscribe(
          (newCoupons: Coupons) => {
            template.hide();
            this.getCoupon();
            this.toastr.success('Inserido com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Inserir: ${error}`);
          }
        );
      } else {
        this.coupon = Object.assign({ id: this.coupon.id }, this.couponsForm.value);

        this.couponService.putCoupons(this.coupon).subscribe(
          () => {
            template.hide();
            this.getCoupon();
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
    this.getCoupon();
  }

}
