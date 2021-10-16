import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { UserComponent } from './Pages/user/user.component';
import { LoginComponent } from './Pages/user/login/login.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }