import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/servicios/logout.service';

@Component({
  selector: 'app-nav-docente',
  templateUrl: './nav-docente.component.html',
  styleUrls: ['./nav-docente.component.css'],
})
export class NavDocenteComponent {
  constructor(private router: Router, private logout: LogoutService) {}

  public logOut(): void {
    this.logout.logout(); //mandamos a eliminar la cookie de usuario
  }
}
