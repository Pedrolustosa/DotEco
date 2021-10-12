import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Pages/login/login.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RecoveryComponent } from './Pages/recovery/recovery.component';
import { RegisterComponent } from './Pages/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { RequestRecycleComponent } from './Pages/request-recycle/request-recycle.component';
import { RequestRecycleListComponent } from './Pages/request-recycle/request-recycle-list/request-recycle-list.component';
import { RequestRecycleDetailComponent } from './Pages/request-recycle/request-recycle-detail/request-recycle-detail.component';
import { HomeComponent } from './Pages/home/home.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "login/register/login", component: LoginComponent },
  { path: "login/register", component: RegisterComponent },
  { path: "login/recovery", component: RecoveryComponent },
  { path: "profile", component: ProfileComponent },
  { path: "dashboard", component: DashboardComponent },
  {
    path: 'requestrecycle', component: RequestRecycleComponent,
    children: [
      { path: 'detail/:id', component: RequestRecycleDetailComponent },
      { path: 'detail', component: RequestRecycleDetailComponent },
      { path: 'list', component: RequestRecycleListComponent },
    ],
  },
  {path:"home",component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
