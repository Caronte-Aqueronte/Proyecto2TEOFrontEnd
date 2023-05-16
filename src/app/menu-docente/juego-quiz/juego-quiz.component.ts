import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/app/servicios/quiz.service';

@Component({
    selector: 'app-juego-quiz',
    templateUrl: './juego-quiz.component.html',
    styleUrls: ['./juego-quiz.component.css']
})
export class JuegoQuizComponent {
    public formIngresarPregunta: FormGroup; //form para ingresar nueva palabra
    private usuarioCreador: string;
    public preguntasQuiz: Array<any> = []; //array de preguntas del quiz que se mostraran visualmente
    private preguntasBody: Array<any> = []; //array de preguntas del quz que enviaremos al backend
    constructor(
        private formBuilder: FormBuilder,
        private cookiesService: CookieService,
        private quizservice: QuizService
    ) {
        //obtener el nombre del usuario registrado
        this.usuarioCreador = this.cookiesService.get('usuario');
        //inicializamos el formulario
        this.formIngresarPregunta = this.formBuilder.group({
            nombreJuego: ['', [Validators.required]],
            pregunta: ['', [Validators.required]],
            opcion1: ['', [Validators.required]],
            opcion2: ['', [Validators.required]],
            opcion3: ['',],
            respuestaCorrecta: ['', [Validators.required]],
        });

    }

    public crearJuegoQuiz(): void {
        if (this.preguntasBody.length <= 0) {
            alert('Debe tener al menos una pregunta creada');
            return;
        }

        let nombreJuego = this.formIngresarPregunta.controls['nombreJuego'].value;
        let juego = new Object({
            usuarioCreador: this.usuarioCreador,
            nombre: nombreJuego,
            preguntasQuiz: this.preguntasBody,
        });
        this.quizservice.crearJuegoQuiz(juego).subscribe((r: any) => {
            if (r.estado) {
                alert(r.respuesta + '\nEl codigo del juego es ' + r.codigoDeJuego); //mostramos el mensaje de confirmacion
                this.preguntasQuiz = []; //vaciamos el array
                this.preguntasBody = [];
                //borramos los txt
                this.formIngresarPregunta.controls['pregunta'].setValue('');
                this.formIngresarPregunta.controls['opcion1'].setValue('');
                this.formIngresarPregunta.controls['opcion2'].setValue('');
                this.formIngresarPregunta.controls['opcion3'].setValue('');
                this.formIngresarPregunta.controls['respuestaCorrecta'].setValue('');
                this.formIngresarPregunta.controls['nombreJuego'].setValue('');
            }
        });
    }



    //Ingresar preguntas, puede ser una o varias 
    public ingresarPregunta(): void {
        const idPreguntas = this.preguntasQuiz.length;
        //recaudamos los datos de los fields
        const pregunta = this.formIngresarPregunta.controls['pregunta'].value;
        const opcion1 = this.formIngresarPregunta.controls['opcion1'].value;
        const opcion2 = this.formIngresarPregunta.controls['opcion2'].value;
        const opcion3 = this.formIngresarPregunta.controls['opcion3'].value;
        const respuestaCorrecta = this.formIngresarPregunta.controls['respuestaCorrecta'].value;
        //agregamos un nuevo objeto de preguntas al array de preguntasQuiz
        this.preguntasQuiz.push({
            pregunta: pregunta,
            opcion1: opcion1,
            opcion2: opcion2,
            opcion3: opcion3,
            respuestaCorrecta: respuestaCorrecta
        });
        //agregamos el contenido al array preguntasBody
        this.preguntasBody.push({
            pregunta: pregunta,
            opciones: [
                { opcion: opcion1 },
                { opcion: opcion2 },
                { opcion: opcion3 }
            ],
            respuestaCorrecta: respuestaCorrecta
        });

        //borramos los txt
        this.formIngresarPregunta.controls['pregunta'].setValue('');
        this.formIngresarPregunta.controls['opcion1'].setValue('');
        this.formIngresarPregunta.controls['opcion2'].setValue('');
        this.formIngresarPregunta.controls['opcion3'].setValue('');
        this.formIngresarPregunta.controls['respuestaCorrecta'].setValue('');
    }


    public eliminarPregunta(idPreguntas: any, idPreguntasBody: any) {
        this.preguntasQuiz.splice(idPreguntas, 1); //elimina un elemento del array de peguntasQuiz respecto al id de la tarjeta precionada

        for (let x = 0; x < this.preguntasBody.length; x++) {
            //si el idPregunta enviado  coincide con el idPregunta de un elemento en el array entonces procedemos a eliminar
            if (this.preguntasBody[x].idPreguntas == idPreguntasBody) {

                this.preguntasBody.splice(x, 2);
            }
        }
    }
}
