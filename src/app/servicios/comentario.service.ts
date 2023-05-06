import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private url = 'http://localhost:3000/comentario';

  constructor(private http: HttpClient) {}

  public nuevoComentario(body: any): Observable<any> {
    return this.http.post(this.url + '/nuevoComentario', body);
  }

  public traerComentariosDeJuego(id: any): Observable<any> {
    return this.http.get(this.url + `/traerComentariosDeJuego?id=${id}`);
  }
}
