import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AhorcadoService {
  private url = 'http://localhost:3000/ahorcado';
  constructor(private http: HttpClient) {}

  public crearJuegoAhorcado(body: any): Observable<any> {
    return this.http.post(this.url + '/crearJuegoAhorcado', body);
  }

  public guardarPunteoAhorcado(body: any): Observable<any> {
    return this.http.post(this.url + '/guardarPunteoAhorcado', body);
  }
}
