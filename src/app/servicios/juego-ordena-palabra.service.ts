import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JuegoOrdenaPalabraService {
  private url = 'http://localhost:3000/juegoOrdenaPalabra';

  constructor(private http: HttpClient) {}

  /**
   * Lanza un post al backend para crear un nuevo juego
   * @param body \
   * @returns
   */
  public crearJuegoOrdenaPalabra(body: any): Observable<any> {
    return this.http.post<Observable<any>>(
      this.url + '/crearJuegoOrdenaPalabra',
      body
    );
  }

  /**
   * Lanza un get al backend para traer las palabras desordenadas de un juego de ordena palabra
   * @param id
   * @returns
   */
  public iniciarJuegoOrdenaPalabra(id: any): Observable<any> {
    return this.http.get(this.url + `/iniciarJuegoOrdenaPalabra?codigo=${id}`);
  }

  /**
   * Lanza un post al backend para evaluar lar respuestas del usuario y recuperar un punteo
   * @param id
   * @returns
   */
  public calificarJuegoOrdenaPalabra(body: any): Observable<any> {
    return this.http.post(this.url + `/calificarJuegoOrdenaPalabra`, body);
  }
}
