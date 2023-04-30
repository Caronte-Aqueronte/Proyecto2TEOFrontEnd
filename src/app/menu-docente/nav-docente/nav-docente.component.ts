import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-docente',
  templateUrl: './nav-docente.component.html',
  styleUrls: ['./nav-docente.component.css']
})
export class NavDocenteComponent {

  constructor(private router:Router){

  }
}
