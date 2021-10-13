import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Shared/nav/nav.component';
import { TitleComponent } from './Shared/title/title.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestRecycleComponent } from './Pages/request-recycle/request-recycle.component';
import { RecoveryComponent } from './Pages/recovery/recovery.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { RequestRecycleListComponent } from './Pages/request-recycle/request-recycle-list/request-recycle-list.component';
import { RequestRecycleDetailComponent } from './Pages/request-recycle/request-recycle-detail/request-recycle-detail.component';
import { HomeComponent } from './Pages/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserComponent } from './Pages/user/user.component';
import { LoginComponent } from './Pages/user/login/login.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TitleComponent,
    RequestRecycleComponent,
    RecoveryComponent,
    ProfileComponent,
    DashboardComponent,
    RequestRecycleListComponent,
    RequestRecycleDetailComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }