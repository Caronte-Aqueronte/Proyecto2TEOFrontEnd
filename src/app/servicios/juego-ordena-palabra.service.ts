import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JuegoOrdenaPalabraService {
  private url = 'http://localhost:3000/juegoOrdenaPalabra';

  constructor(private http: HttpClient) {}

  public crearJuegoOrdenaPalabra(body: any): Observable<any> {
    return this.http.post<Observable<any>>(
      this.url + '/crearJuegoOrdenaPalabra',
      body
    );
  }
}
