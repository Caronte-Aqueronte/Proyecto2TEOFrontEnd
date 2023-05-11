import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JuegoMemoriaService {
  private url = 'http://localhost:3000/memoria';
  constructor(private http: HttpClient) {}

  /**
   * Lanza un post al backend para la creacion de un juego de memoria
   * @param body
   * @returns
   */
  public crearJuegoMemoria(body: any): any {
    return this.http.post(this.url + '/crearJuegoMemoria', body);
  }

  /**
   * Lanza un post al backend para guardar un punteo del juego de memoria
   * @param body
   * @returns
   */
  public guardarPunteoMemoria(body: any): any {
    return this.http.post(this.url + '/guardarPunteoMemoria', body);
  }
}
