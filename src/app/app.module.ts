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
import {CookieService} from 'ngx-cookie-service';
import { JuegosContainerComponent } from './menu-estudiante/juegos-container/juegos-container.component';
import { JuegosCardComponent } from './menu-estudiante/juegos-card/juegos-card.component';
import { JuegoPerfilComponent } from './menu-estudiante/juego-perfil/juego-perfil.component';
import { MatTableModule } from '@angular/material/table' 
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComentarioCardComponent } from './menu-estudiante/comentario-card/comentario-card.component';
import { JugarOrdenaPalabraComponent } from './menu-estudiante/juegos/jugar-ordena-palabra/jugar-ordena-palabra.component';
import { JugarAhorcadoComponent } from './menu-estudiante/juegos/jugar-ahorcado/jugar-ahorcado.component' 

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
    JuegosContainerComponent,
    JuegosCardComponent,
    JuegoPerfilComponent,
    ComentarioCardComponent,
    JugarOrdenaPalabraComponent,
    JugarAhorcadoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
 

    
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
