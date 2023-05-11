import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-memoria-card',
  templateUrl: './memoria-card.component.html',
  styleUrls: ['./memoria-card.component.css'],
})
export class MemoriaCardComponent {
  @Input() card: any; //datos de la carta
  @Input() id: any; //id de la pareja que debemos buscar

  @Output() notificador = new EventEmitter<any>(); //nos servira para notificar al padre que se acaba de voltear una carta


  public voltear(): void {
    //depenmdela bandera asi daremos la bueltaa la tarjeta

    this.card.styleExp = 'rotateY(180deg)';

    //tiempo que tardara la animacion de cambio
    setTimeout(() => {
      if (!this.card.volteado) {
        //si la carta no esta volteada entonces la mostramos, de lo contrario no hacemos nada
        this.card.volteado = !this.card.volteado;
      }
    }, 300);

    //si lacarta no estaba volteada entonces se volteara y notificamos
    if (!this.card.volteado) {
      //luego de 600 milisegundos lanzamos la senal al padre para que evalue si se encontro una pareja
      setTimeout(() => {
        this.notificador.emit(this.id); //enviamos el id de la carta levantada
      }, 1000);
    }
  }
}
