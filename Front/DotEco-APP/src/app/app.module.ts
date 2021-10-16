import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HomeComponent } from './Pages/home/home.component';
import { UserComponent } from './Pages/user/user.component';
import { LoginComponent } from './Pages/user/login/login.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';

import { NavComponent } from './Shared/nav/nav.component';
import { TitleComponent } from './Shared/title/title.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TitleComponent,
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