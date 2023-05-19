import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuDocenteComponent } from './menu-docente/menu-docente/menu-docente.component';
import { MenuEstudianteComponent } from './menu-estudiante/menu-estudiante/menu-estudiante.component';
import { OrdenaPalabraPageComponent } from './menu-docente/juego-ordena-palabra/ordena-palabra-page/ordena-palabra-page.component';
import { JuegosContainerComponent } from './menu-estudiante/juegos-container/juegos-container.component';
import { JuegoPerfilComponent } from './menu-estudiante/juego-perfil/juego-perfil.component';
import { JugarOrdenaPalabraComponent } from './menu-estudiante/juegos/jugar-ordena-palabra/jugar-ordena-palabra.component';
import { JuegoAhorcadoComponent } from './menu-docente/juego-ahorcado/juego-ahorcado.component';
import { JugarAhorcadoComponent } from './menu-estudiante/juegos/jugar-ahorcado/jugar-ahorcado.component';
import { JuegoMemoriaComponent } from './menu-docente/juego-memoria/juego-memoria.component';
import { JugarMemoriaComponent } from './menu-estudiante/juegos/jugar-memoria/jugar-memoria.component';
import { JuegoQuizComponent } from './menu-docente/juego-quiz/juego-quiz.component';
import { JugarQuizComponent } from './menu-estudiante/juegos/jugar-quiz/jugar-quiz.component';
import { MedallasPageComponent } from './menu-estudiante/medallas-page/medallas-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu-docente',
    component: MenuDocenteComponent,
    children: [
      {
        path: 'crear-ordena-palabra',
        component: OrdenaPalabraPageComponent,
      },
      {
        path: 'crear-ahorcado',
        component: JuegoAhorcadoComponent,
      },
      {
        path: 'crear-memoria',
        component: JuegoMemoriaComponent,
      },
      {
        path: 'crear-quiz',
        component: JuegoQuizComponent,
      },
    ],
  },
  {
    path: 'menu-estudiante',
    component: MenuEstudianteComponent,
    children: [
      {
        path: 'juegos',
        component: JuegosContainerComponent,
      },
      {
        path: 'juegos-perfil/:id',
        component: JuegoPerfilComponent,
      },
      {
        path: 'jugar-ordena-palabra/:id',
        component: JugarOrdenaPalabraComponent,
      },
      {
        path: 'jugar-ahorcado/:id',
        component: JugarAhorcadoComponent,
      },
      {
        path: 'jugar-memoria/:id',
        component: JugarMemoriaComponent,
      },
      {
        path: 'jugar-quiz/:id',
        component: JugarQuizComponent,
      },
      {
        path: 'mis-punteos',
        component: MedallasPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
