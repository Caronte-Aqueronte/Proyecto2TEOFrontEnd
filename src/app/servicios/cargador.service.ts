import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CargadorService {
  constructor() {}

  public cargarScript(archivos: string[]): void {
    for (let archivo of archivos) {
      let script = document.createElement('script');
      script.src = './assets/scripts/' + archivo + '.js';
      let body = document.getElementsByTagName('body')[0];
      body.appendChild(script);
    }
  }
}
