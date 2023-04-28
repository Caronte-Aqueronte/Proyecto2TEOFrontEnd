import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuDocenteComponent } from './menu-docente/menu-docente/menu-docente.component';
import { NavDocenteComponent } from './menu-docente/nav-docente/nav-docente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuDocenteComponent,
    NavDocenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
