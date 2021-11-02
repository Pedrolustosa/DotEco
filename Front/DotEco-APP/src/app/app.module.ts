import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavComponent } from './Shared/nav/nav.component';
import { HomeComponent } from './Pages/home/home.component';
import { UserComponent } from './Pages/user/user.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TitleComponent } from './Shared/title/title.component';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { LoginComponent } from './Pages/user/login/login.component';
import { AssociationService } from './_services/association.service';
import { CouponsComponent } from './Pages/coupons/coupons.component';
import { AssociationComponent } from './Pages/association/association.component';
import { RegistrationComponent } from './Pages/user/registration/registration.component';
import { CollectionDataComponent } from './Pages/collectiondata/collectiondata.component';
import { NgxSpinnerModule } from "ngx-spinner";

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TitleComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    AssociationComponent,
    CouponsComponent,
    CollectionDataComponent
  ],
  imports: [
    CommonModule,
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
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
  ],
  providers: [
    AssociationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }