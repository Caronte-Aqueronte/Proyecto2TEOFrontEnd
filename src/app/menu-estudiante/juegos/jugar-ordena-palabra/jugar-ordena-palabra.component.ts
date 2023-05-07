import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JuegoOrdenaPalabraService } from 'src/app/servicios/juego-ordena-palabra.service';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';

@Component({
  selector: 'app-jugar-ordena-palabra',
  templateUrl: './jugar-ordena-palabra.component.html',
  styleUrls: ['./jugar-ordena-palabra.component.css'],
})
export class JugarOrdenaPalabraComponent {
  public id: any; //id del juego
  public datosJuego: any; //datos del juego
  public palabras: Array<any>;
  constructor(
    private juegoService: JuegoServiceService,
    private juegoOrdenaPalabraService: JuegoOrdenaPalabraService,
    private cookiesService: CookieService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {
    this.palabras = [];
    this.id = this.rutaActiva.snapshot.params['id']; //obtenemos el id del juego ha mostrar
    //mandmaos a traer el juego
    this.traerJuegoPorId();
  }

  public traerJuegoPorId(): void {
    //mandamos a traer el tipo del juego por el id
    this.juegoService.buscarJuegoPorId(this.id).subscribe((r) => {
      this.datosJuego = r;
    });

    //mandamos a trer las palabras desordenadas del juego
    this.juegoOrdenaPalabraService
      .iniciarJuegoOrdenaPalabra(this.id)
      .subscribe((r) => {
        if (r.estado) {
          //si el estado en la respuesta existe entonces algo fallo y ya no hacemos nada
          alert(r.respuesta);
          return;
        }
        this.palabras = r;
      });
  }

  public terminarIntento(): void {
    const palabrasIntento = []; //array de palabras que mandaremos a analizar
    for (let x = 0; x < this.palabras.length; x++) {
      //extraemos los valores de los inputs con el id clave que se asigno en html
      let palabraIntento = (<HTMLInputElement>(
        document.getElementById('input' + x)
      )).value;

      palabrasIntento.push({ palabra: palabraIntento });
    }
    //una vez con el array lleno podemos crear un ibjeto con el id de juego y lasr respuestas recabadas
    let body = new Object({
      jugador: this.cookiesService.get('usuario'),
      id: this.id,
      respuestas: palabrasIntento,
    });
    //enviarlo al backend para que se haga la respectiva verificacion
    this.juegoOrdenaPalabraService
      .calificarJuegoOrdenaPalabra(body)
      .subscribe((r) => {
        if (r.respuesta && r.estado == false) {
          //si hubo un error entonces lo mostramos
          alert(r.respuesta);
          return;
        }

        alert('Tu punteo fue de ' + r.punteo);

        this.router.navigate([//navegamos al perfil del juego para que se puedan visualizar de nuevo los comentarios y records
          `menu-estudiante/juegos-perfil/${this.id}`,
        ]);
      });
  }
}
