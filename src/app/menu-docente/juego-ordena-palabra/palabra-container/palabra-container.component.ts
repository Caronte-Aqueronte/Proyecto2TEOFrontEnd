import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-palabra-container',
  templateUrl: './palabra-container.component.html',
  styleUrls: ['./palabra-container.component.css'],
})
export class PalabraContainerComponent {
  @Input() palabra: any;

  @Input() id: any;

  @Output() notificar = new EventEmitter<any>();
  constructor() {}

  public eliminar(): void {
    this.notificar.emit(this.id);//mandamos a eliminar el id
  }
}
