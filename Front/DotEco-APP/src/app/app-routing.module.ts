import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './Pages/home/home.component';
import { UserComponent } from './Pages/user/user.component';
import { LoginComponent } from './Pages/user/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AssociationComponent } from './Pages/association/association.component';
import { CouponsComponent } from './Pages/coupons/coupons.component';
import { RegistrationComponent } from './Pages/user/registration/registration.component';
import { CollectionDataComponent } from './Pages/collectiondata/collectiondata.component';
import { ProfileComponent } from './Pages/user/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'user', redirectTo: 'user/profile' },
      {
        path: 'user/profile',
        component: ProfileComponent,
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'association', component: AssociationComponent },
      { path: 'coupons', component: CouponsComponent },
      { path: 'collectiondata', component: CollectionDataComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }