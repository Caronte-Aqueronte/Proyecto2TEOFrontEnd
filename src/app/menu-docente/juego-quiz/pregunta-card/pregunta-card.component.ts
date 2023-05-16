import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pregunta-card',
  templateUrl: './pregunta-card.component.html',
  styleUrls: ['./pregunta-card.component.css']
})
export class PreguntaCardComponent {

  @Input() pregunta: any;
  @Input() idPreguntas: any;
  @Output() notificador = new EventEmitter<any>();

  constructor() { }

  public eliminar(): void {
    this.notificador.emit(this.idPreguntas);
  }
}
