import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Pages/login/login.component';
import { RecoveryComponent } from './Pages/recovery/recovery.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RegisterComponent } from './Pages/register/register.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "login/register", component: RegisterComponent },
  { path:"recovery", component: RecoveryComponent}
  { path: "profile", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
