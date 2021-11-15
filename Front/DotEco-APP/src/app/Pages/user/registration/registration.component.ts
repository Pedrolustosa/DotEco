import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/Identity/User';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  userTypes = [
    { id: 1, name: "Cliente" },
    { id: 2, name: "Associação" },
    { id: 3, name: "Empresa" },
    { id: 4, name: "Administrador" }
  ];

  constructor(
    private accountService: AccountService,
    public router: Router,
    public fb: FormBuilder,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      cpf: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparePassword })
    });
  }

  comparePassword(fb: FormGroup) {
    const confirmPasswordCtrl = fb.get('confirmPassword');
    if (confirmPasswordCtrl.errors == null || 'mismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('password').value !== confirmPasswordCtrl.value) {
        confirmPasswordCtrl.setErrors({ mismatch: true });
      } else {
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.user = Object.assign(
        { password: this.registerForm.get('passwords.password').value },
        this.registerForm.value);
      this.accountService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro Realizado');
        }, error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Usuário Duplicado!');
                break;
              default:
                this.toastr.error(`Erro no Cadatro! CODE: ${element.code}`);
                break;
            }
          });
        }
      );
    }
  }

}
