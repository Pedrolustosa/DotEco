import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    TitleComponent,
    RegisterComponent,
    RequestRecycleComponent,
    RecoveryComponent,
    ProfileComponent,
    DashboardComponent,
    RequestRecycleListComponent,
    RequestRecycleDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }