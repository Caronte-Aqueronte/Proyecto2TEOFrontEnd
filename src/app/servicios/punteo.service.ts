import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PunteoService {
  private url = 'http://localhost:3000/punteo';

  constructor(private http: HttpClient) {}

  public traerRankingDeUnJuego(id: any): Observable<any> {
    return this.http.get(this.url + `/traerRankingDeUnJuego?id=${id}`);
  }

  public traerHistorialDeJuego(usuario: any): Observable<any> {
    return this.http.get(this.url + `/traerHistorialDeJuego?usuario=${usuario}`);
  }

  public traerMedallasDeUsuario(usuario: any): Observable<any> {
    return this.http.get(this.url + `/traerMedallasDeUsuario?usuario=${usuario}`);
  }
}
