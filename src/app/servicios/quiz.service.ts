import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private url = 'http://localhost:3000/quiz';


  constructor(private http: HttpClient) { }

  public crearJuegoQuiz(body: any): Observable<any> {
    return this.http.post(this.url + '/crearQuiz', body);
  }

  public JugarQuiz(body: any, id: any): Observable<any> {
    return this.http.post(this.url + `/JugarQuiz/${id}`, body);
  }

  //Obtener las preguntas desde el Backend 
  public getPreguntas(id: any) {
    return this.http.get(this.url + `/JugarQuiz/${id}/preguntas`);
  }

  //Almacenar el punteo del Quiz 
  public guardarPunteoQuiz(body: any): any {
    return this.http.post(this.url + '/guardarPunteoQuiz', body);
  }
}
