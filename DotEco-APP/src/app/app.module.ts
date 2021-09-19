import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { NavComponent } from './Shared/nav/nav.component';
import { TitleComponent } from './shared/title/title.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    TitleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
