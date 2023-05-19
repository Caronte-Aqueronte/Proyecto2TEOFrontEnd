import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JuegoServiceService {
  private url = 'http://localhost:3000/juego';

  constructor(private http: HttpClient) {}

  public mostrarJuegos(): Observable<any> {
    return this.http.get<Observable<any>>(this.url + '/mostrarJuegos');
  }

  public buscarJuegoPorId(id: any): Observable<any> {
    return this.http.get<Observable<any>>(
      this.url + `/buscarJuegoPorId?id=${id}`
    );
  }

  public MostrarJuegosporUsuario(usuario: any): Observable<any> {
    return this.http.get<Observable<any>>(
      this.url + `/mostrarJuegosDeDocente?usuario=${usuario}`
    );
  }
}
