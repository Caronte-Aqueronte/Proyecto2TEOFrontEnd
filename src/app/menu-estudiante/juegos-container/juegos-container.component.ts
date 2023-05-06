import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';

@Component({
  selector: 'app-juegos-container',
  templateUrl: './juegos-container.component.html',
  styleUrls: ['./juegos-container.component.css'],
})
export class JuegosContainerComponent implements OnInit {
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
