import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './Pages/home/home.component';
import { UserComponent } from './Pages/user/user.component';
import { LoginComponent } from './Pages/user/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AssociationComponent } from './Pages/association/association.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { CouponsComponent } from './Pages/coupons/coupons.component';
import { RegistrationComponent } from './Pages/user/registration/registration.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'association', component: AssociationComponent, canActivate: [AuthGuard] },
  { path: 'coupons', component: CouponsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
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