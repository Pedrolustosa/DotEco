import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Coupons, Status } from 'src/app/_models/Coupons';
import { User } from 'src/app/_models/Identity/User';
import { UserUpdate } from 'src/app/_models/Identity/UserUpdate';
import { AccountService } from 'src/app/_services/account.service';
import { CouponsService } from 'src/app/_services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  p: number = 1;

  couponsForm: FormGroup;
  form!: FormGroup;

  availableCoupons: Coupons[];
  rescueCoupons: Coupons[];
  usedCoupons: Coupons[];
  companyCoupons: Coupons[];
  coupon: Coupons;

  status = Status;

  user: User;
  userId: Observable<User[]>;
  userUpdate = {} as UserUpdate;

  mode = 'post';
  _filterList = '';
  bodyDeleteCoupons = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
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
    this.carregarUsuario();
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
          this.getCouponsById();
          this.getCoupons();
        },
        (error) => {
          console.error(error);
          this.toaster.error('Usuário não Carregado', 'Erro');
          this.router.navigate(['/dashboard']);
        }
      ).add(() => this.spinner.hide());
  }

  validation() {
    this.couponsForm = this.fb.group({
      name: ['', Validators.required],
      percent: ['', Validators.required],
      description: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
        ]
      ],
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
    this.bodyDeleteCoupons = `Tem certeza que deseja excluir o Cupom: ${this.coupon.name}`;
  }

  confirmDelete(template: any) {
    this.couponService.deleteCoupons(this.coupon.id).subscribe(
      () => {
        template.hide();
        this.getCouponsById();
        this.toastr.success('Deletado com Sucesso');
      }, error => {
        this.toastr.error('Erro ao tentar Deletar');
        console.log(error);
      }
    );
  }

  public getCoupons(): void {
    this.couponService.getAllCoupons().subscribe({
      next: (coupons: Coupons[]) => {
        this.availableCoupons = coupons;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Cupons do Cliente', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });
  }

  public getCouponsById(): void {
    if (this.userUpdate.type === 1) {
      this.couponService.GetCouponsUsedAsync(this.userUpdate.id).subscribe({
        next: (coupons: Coupons[]) => {
          this.usedCoupons = coupons;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar os Cupons do Cliente', 'Erro!');
        },
        complete: () => this.spinner.hide()
      });
      this.couponService.getCouponByUserId(this.userUpdate.id).subscribe({
        next: (coupons: Coupons[]) => {
          this.rescueCoupons = coupons;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar os Cupons do Cliente', 'Erro!');
        },
        complete: () => this.spinner.hide()
      });
    }
    if (this.userUpdate.type === 3) {
      this.couponService.getCouponByCompanyId(this.userUpdate.id).subscribe({
        next: (coupons: Coupons[]) => {
          this.companyCoupons = coupons;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar os Cupons da Empresa', 'Erro!');
        },
        complete: () => this.spinner.hide()
      });
    }
  }

  saveAlteration(template: any) {
    if (this.couponsForm.valid) {
      if (this.mode === 'post') {
        this.coupon = Object.assign({}, this.couponsForm.value);
        this.coupon.companyId = this.userUpdate.id
        this.couponService.postCoupons(this.coupon).subscribe(
          (newCoupons: Coupons) => {
            template.hide();
            this.getCouponsById();
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
            this.getCoupons();
            this.toastr.success('Editado com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}`);
          }
        );
      }
    }
  }

}
