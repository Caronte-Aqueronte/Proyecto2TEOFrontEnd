import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos-card',
  templateUrl: './juegos-card.component.html',
  styleUrls: ['./juegos-card.component.css'],
})
export class JuegosCardComponent {
  @Input() juego: any;

  constructor(private router: Router) { }

  public aJuegoPerfil(): void {
    this.router.navigate([]);
    this.router.navigate([`menu-estudiante/juegos-perfil/${this.juego._id}`]);
  }

  /*getImagenJuego(tipo: string): string {
    if (tipo === 'Quiz') {
      return 'url(../../../assets/img/quizz.png)';
    } else if (tipo === 'Ahorcado') {
      return 'url(../../../assets/img/juego-del-ahorcado.png)';
    } else if (tipo === 'Memoria') {
      return 'url(../../../assets/img/memoria.png)';
    } else if (tipo === 'Ordena palabra') {
      return 'url(../../../assets/img/ordenaPalabra.png)';
    } else {
      // Tipo de juego desconocido
      return '';
    }
  }*/
  getImagenJuego(tipoJuego: string): string {
    let imagen: string;

    // Asigna la ruta de la imagen según el tipo de juego
    if (tipoJuego === 'Quiz') {
      imagen = '../../../assets/img/quizz.png';
    } else if (tipoJuego === 'Ahorcado') {
      imagen = '../../../assets/img/juego-del-ahorcado.png';
    } else if (tipoJuego === 'Memoria') {
      imagen = '../../../assets/img/memoria.png';
    } else if (tipoJuego === 'Ordena palabra') {
      imagen = '../../../assets/img/ordenaPalabra.png';
    } else {
      imagen = ''; // Ruta de imagen por defecto o en caso de tipo de juego desconocido
    }

    return imagen;
  }

}
