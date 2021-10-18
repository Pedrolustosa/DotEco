import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Coupons } from 'src/app/_models/Coupons';
import { CouponsService } from 'src/app/_services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  titulo = 'Associações';
  couponsFilters: Coupons[];
  coupons: Coupons[];
  coupon: Coupons;
  couponsForm: FormGroup;
  mode = 'post';
  _filterList = '';
  bodyDeleteCoupons = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private localeService: BsLocaleService,
    private couponService: CouponsService,
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
    this.getCoupon();
  }

  get filterList(): string {
    return this._filterList;
  }
  set filterList(value: string) {
    this._filterList = value;
    this.couponsFilters = this.filterList ? this.filterCoupons(this.filterList) : this.coupons;
  }

  openModal(template: any) {
    this.couponsForm.reset();
    template.show();
  }

  validation() {
    this.couponsForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      percent: ['', Validators.required],
    });
  }

  filterCoupons(filterFor: string): Coupons[] {
    filterFor = filterFor.toLocaleLowerCase();
    return this.coupons.filter(
      coupon => coupon.name.toLocaleLowerCase().indexOf(filterFor) !== -1
    );
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
    this.bodyDeleteCoupons = `Tem certeza que deseja excluir o Evento: ${this.coupon.name}, Código: ${this.coupon.id}`;
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

  getCoupon() {
    this.couponService.getAllCoupons().subscribe(
      (_coupons: Coupons[]) => {
        this.coupons = _coupons;
        this.couponsFilters = this.coupons;
        console.log(this.coupons);
      }, error => {
        this.toastr.error(`Erro ao tentar Carregar eventos: ${error}`);
      });
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

}
