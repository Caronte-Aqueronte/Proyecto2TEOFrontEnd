import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos-card',
  templateUrl: './juegos-card.component.html',
  styleUrls: ['./juegos-card.component.css'],
})
export class JuegosCardComponent {
  @Input() juego: any;

  constructor(private router: Router) {}

  public aJuegoPerfil(): void {
    this.router.navigate([]);
    this.router.navigate([`menu-estudiante/juegos-perfil/${this.juego._id}`]);
  }
}
