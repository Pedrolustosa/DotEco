import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { UserLogin } from 'src/app/_models/Identity/UserLogin';

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
    private toaster: ToastrService
  ) { }

  ngOnInit(): void { }

  public login(): void {
    this.accountService.login(this.model).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
      },
      (error: any) => {
        if (error.status == 401)
          this.toaster.error('usuário ou senha inválido');
        else console.error(error);
      }
    );
  }
}
