import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RequestRecycleDetailComponent } from './Pages/request-recycle/request-recycle-detail/request-recycle-detail.component';
import { RequestRecycleListComponent } from './Pages/request-recycle/request-recycle-list/request-recycle-list.component';
import { RequestRecycleComponent } from './Pages/request-recycle/request-recycle.component';
import { UserComponent } from './Pages/user/user.component';
import { LoginComponent } from './Pages/user/login/login.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent,
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