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
import { JugarAhorcadoComponent } from './menu-estudiante/juegos/jugar-ahorcado/jugar-ahorcado.component';
import { CronometroComponent } from './menu-estudiante/cronometro/cronometro.component';
import { JuegoAhorcadoComponent } from './menu-docente/juego-ahorcado/juego-ahorcado.component';
import { AhorcadoFieldComponent } from './menu-estudiante/juegos/ahorcado-field/ahorcado-field.component';
import { JugarMemoriaComponent } from './menu-estudiante/juegos/jugar-memoria/jugar-memoria.component';
import { MemoriaCardComponent } from './menu-estudiante/juegos/memoria-card/memoria-card.component';
import { JuegoMemoriaComponent } from './menu-docente/juego-memoria/juego-memoria.component';
import { ParCardComponent } from './menu-docente/juego-memoria/par-card/par-card.component';
import { JugarQuizComponent } from './menu-estudiante/juegos/jugar-quiz/jugar-quiz.component';
import { JuegoQuizComponent } from './menu-docente/juego-quiz/juego-quiz.component';
import { PreguntaCardComponent } from './menu-docente/juego-quiz/pregunta-card/pregunta-card.component';
import { MedallasPageComponent } from './menu-estudiante/medallas-page/medallas-page.component';

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
    CronometroComponent,
    JuegoAhorcadoComponent,
    AhorcadoFieldComponent,
    JugarMemoriaComponent,
    MemoriaCardComponent,
    JuegoMemoriaComponent,
    ParCardComponent,
    JugarQuizComponent,
    JuegoQuizComponent,
    PreguntaCardComponent,
    MedallasPageComponent,
    
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
