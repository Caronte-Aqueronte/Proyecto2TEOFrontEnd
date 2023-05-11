import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-par-card',
  templateUrl: './par-card.component.html',
  styleUrls: ['./par-card.component.css'],
})
export class ParCardComponent {
  
  @Input() pareja: any;
  @Input() idPareja:any;
  @Output() notificador = new EventEmitter<any>();

  constructor() {}

  public eliminar(): void {
    this.notificador.emit(this.idPareja);
  }
}
