import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { UserLogin } from 'src/app/_models/Identity/UserLogin';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isCollapsed = true;
  model = {} as UserLogin;

  constructor(
    private accountService: AccountService,
    public router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void { }

  public login(): void {
    this.spinner.show();
    this.accountService.login(this.model).subscribe(
      () => {
        this.router.navigateByUrl('/home');
      },
      (error: any) => {
        if (error.status == 401)
          this.toaster.error('usuário ou senha inválido');
        else console.error(error);
      }
    ).add(() => this.spinner.hide());
  }
}
