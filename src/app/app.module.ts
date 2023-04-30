import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuDocenteComponent } from './menu-docente/menu-docente/menu-docente.component';
import { NavDocenteComponent } from './menu-docente/nav-docente/nav-docente.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuEstudianteComponent } from './menu-estudiante/menu-estudiante/menu-estudiante.component';
import { NavEstudianteComponent } from './menu-estudiante/nav-estudiante/nav-estudiante.component';
import { OrdenaPalabraPageComponent } from './menu-docente/juego-ordena-palabra/ordena-palabra-page/ordena-palabra-page.component';
import { PalabraContainerComponent } from './menu-docente/juego-ordena-palabra/palabra-container/palabra-container.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuDocenteComponent,
    NavDocenteComponent,
    MenuEstudianteComponent,
    NavEstudianteComponent,
    OrdenaPalabraPageComponent,
    PalabraContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
