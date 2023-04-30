import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuDocenteComponent } from './menu-docente/menu-docente/menu-docente.component';
import { MenuEstudianteComponent } from './menu-estudiante/menu-estudiante/menu-estudiante.component';
import { OrdenaPalabraPageComponent } from './menu-docente/juego-ordena-palabra/ordena-palabra-page/ordena-palabra-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu-docente',
    component: MenuDocenteComponent,
    children: [
      {
        path:'crear-ordena-palabra',
        component: OrdenaPalabraPageComponent
      }
    ],
  },
  {
    path: 'menu-estudiante',
    component: MenuEstudianteComponent,
    children: [],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
