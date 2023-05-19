import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos-card',
  templateUrl: './juegos-card.component.html',
  styleUrls: ['./juegos-card.component.css'],
})
export class JuegosCardComponent {
  @Input() juego: any;
  @Input() estado: any;
  constructor(private router: Router) {}

  public aJuegoPerfil(): void {
    this.router.navigate([]);
    this.router.navigate([
      `menu-estudiante/juegos-perfil/${this.juego._id}/${this.estado}`,
    ]);
  }

  getImagenJuego(tipoJuego: string): string {
    let imagen: string;

    // Asigna la ruta de la imagen según el tipo de juego
    if (tipoJuego === 'Quiz') {
      imagen = '../../../assets/img/medalla4.png';
    } else if (tipoJuego === 'Ahorcado') {
      imagen = '../../../assets/img/medalla1.png';
    } else if (tipoJuego === 'Memoria') {
      imagen = '../../../assets/img/memoria.png';
    } else if (tipoJuego === 'Ordena palabra') {
      imagen = '../../../assets/img/medalla3.png';
    } else {
      imagen = ''; // Ruta de imagen por defecto o en caso de tipo de juego desconocido
    }

    return imagen;
  }
}
