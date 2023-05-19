import { Component } from '@angular/core';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';

@Component({
  selector: 'app-juegos-creados',
  templateUrl: './juegos-creados.component.html',
  styleUrls: ['./juegos-creados.component.css']
})
export class JuegosCreadosComponent {
  public cards: Array<any>;

  constructor(private juegoService: JuegoServiceService) {
    this.cards = [];
    this.mostrarJuegos();
  }

  ngOnInit(): void {}

  public mostrarJuegos(): void {
    this.juegoService.mostrarJuegos().subscribe((r) => {
      this.cards = r;//igualamos el array al array devuelto por el backend
    });
  }
}
