import { AfterContentInit, Component, EventEmitter, Output , OnDestroy} from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css'],
})
export class CronometroComponent implements AfterContentInit, OnDestroy{

  @Output() salida: EventEmitter<any> = new EventEmitter();

  milisegundos: number = 0;
  milisegundosAux: number = 0;


  segundos: number = 0;
  segundosAux: number = 0;
  minutos: number = 0;
  horas: number = 0;


  interval :any;

  constructor() {

  }

  ngAfterContentInit(): void {
    this.interval = setInterval(() => {
  
      this.segundos++;
      this.segundosAux++;

      if (this.segundosAux == 60) {
        this.segundosAux = 0;
        this.minutos++;
      }
  
      if (this.minutos == 60) {
        this.minutos = 0;
        this.horas++;
      }
  
    this.salida.emit(this.segundos);


    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
