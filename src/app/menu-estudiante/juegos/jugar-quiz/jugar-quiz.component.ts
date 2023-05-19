import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/app/servicios/quiz.service';

@Component({
  selector: 'app-jugar-quiz',
  templateUrl: './jugar-quiz.component.html',
  styleUrls: ['./jugar-quiz.component.css']
})
export class JugarQuizComponent {
  //usuario que esta jugando
  public usuarioJugador: string = '';
  //id del juego
  public idJuego: string = '';
  //array para las preguntas 
  preguntas: any[] = [];
  //pregunta actual, que se esta respondiendo 
  preguntaActual: number = 0;
  //numero de segundos que envia el cronometro
  public cronometro: number = 0;
  //puntaje 
  public puntaje: number = 0;
  //Contador para el total de preguntas de un quiz
  public totalPreguntas!: number;
  //Para finalizar el juego, si inicializa en false
  public juegoFinalizado: boolean = false;


  //obtengo las preguntas segun el id del juego 
  constructor(private quizService: QuizService, private rutaActiva: ActivatedRoute, private router: Router, private cookiesService: CookieService,) {
    //obtener el nombre del jugador
    this.usuarioJugador = this.cookiesService.get('usuario');
    this.idJuego = this.rutaActiva.snapshot.params['id'];
    this.getPreguntas();
  }

  //llamo las preguntas desde el servidor 
  getPreguntas() {
    this.quizService.getPreguntas(this.idJuego).subscribe(
      (data: any) => {
        console.log(data);
        this.preguntas = data.preguntasQuiz.map((pregunta: any) => {
          return {

            pregunta: pregunta.pregunta,
            opciones: pregunta.opciones.map((opcion: any) => opcion.opcion),
            respuestaCorrecta: pregunta.respuestaCorrecta,
          };
        });
        this.totalPreguntas = this.preguntas.length;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  //seleccionar una opcion 
  selectOption(opcionIndex: number) {

    const seleccionQuiz = this.preguntas[this.preguntaActual];
    const respuestaAnterior = seleccionQuiz.respuestaUsuario; // Guardar la respuesta anterior

    seleccionQuiz.respuestaUsuario = opcionIndex; // Asignar la nueva respuesta seleccionada

    // Obtener el valor de la respuesta seleccionada y la respuesta anterior
    const respuestaSeleccionada = seleccionQuiz.opciones[opcionIndex];
    const respuestaAnteriorSeleccionada = seleccionQuiz.opciones[respuestaAnterior];

    // Verificar si la opción seleccionada es la respuesta correcta
    if (respuestaSeleccionada === seleccionQuiz.respuestaCorrecta) {
      // Incrementar el puntaje si la nueva respuesta seleccionada es correcta
      this.puntaje++;
    }

    // Verificar si la respuesta anterior era correcta y si era diferente a la nueva respuesta seleccionada
    if (
      respuestaAnteriorSeleccionada === seleccionQuiz.respuestaCorrecta &&
      respuestaAnterior !== opcionIndex
    ) {
      // Restar el puntaje si la respuesta anterior era correcta pero se cambió a una nueva respuesta
      this.puntaje--;
    }
  }


  //Para saltar a la siguiente pregunta 
  siguientePregunta() {
    this.preguntaActual++;
  }

  //para regresar a la pregunta anterior 
  anteriorPregunta() {
    this.preguntaActual--;
  }

  //boton finalizar juego, calculo y muestro el punteo 
  finalizarJuego() {
    // Calcular el puntaje total
    const puntajeTotal = this.puntaje;
    this.juegoFinalizado = true; // Establece juegoFinalizado a true
    //si la validacion se paso entonces podemos mandar el punteo del usuario
    let body = new Object({
      //se contruye el body de la request con los datos recopilados en el funcionamineto del juego
      id: this.idJuego,
      jugador: this.usuarioJugador,
      tiempo: this.cronometro,
      punteo: puntajeTotal,
    });
    this.quizService.guardarPunteoQuiz(body).subscribe((r: any) => {
      // Mostrar el puntaje al usuario
      alert(`Tu puntaje es: ${puntajeTotal} de ${this.preguntas.length}`);
      this.router.navigate([
        //navegamos al perfil del juego para que se puedan visualizar de nuevo los comentarios y records
        `menu-estudiante/juegos-perfil/${this.idJuego}/true`,
      ]);
    });

  }


  //Setea el tiempo del juego calculado por un componente encargado de eso
  public setCronometro(event: any): void {
    this.cronometro = event;
  }
}
