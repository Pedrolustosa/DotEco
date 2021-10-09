import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isCollapsed = true;
  model: any = {};

  constructor(
    private authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
          this.toastr.success('Logado com Sucesso');
        },
        error => {
          this.toastr.error('Falha ao tentar Logar');
        }
      );
  }

}
