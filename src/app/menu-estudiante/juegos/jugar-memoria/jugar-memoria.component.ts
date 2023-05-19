import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JuegoMemoriaService } from 'src/app/servicios/juego-memoria.service';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';

@Component({
  selector: 'app-jugar-memoria',
  templateUrl: './jugar-memoria.component.html',
  styleUrls: ['./jugar-memoria.component.css'],
})
export class JugarMemoriaComponent {
  //usuario que esta jugando
  public usuarioJugador: string = '';
  //numero de segundos que envia el cronometro
  public cronometro: number = 0;
  //id del juego ha jugar
  public idJuego: string = '';
  //datos generales del juego
  public datosJuego: any = null;
  //parejas ha encontrar
  public parejas: Array<any> = [];

  //carta que servira para saber si hay alguna volteada
  private idCartaSeleccionada: any = null;
  private posCartaSeleccionada: any = null;

  constructor(
    private juegosService: JuegoServiceService,
    private juegoMemoriaService: JuegoMemoriaService,
    private cookiesService: CookieService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {
    //obtener el nombre del jugador
    this.usuarioJugador = this.cookiesService.get('usuario');
    //obtener el id del juego
    this.idJuego = this.rutaActiva.snapshot.params['id']; //obtenemos el id del juego ha mostrar
    //mandamos a traer los datos del juego
    this.juegosService.buscarJuegoPorId(this.idJuego).subscribe((r) => {
      this.datosJuego = r; //igualamos los datos del juego a la respuesta del server
      this.parejas = r.pares; //igualamos los pares del response al de la clase
      this.parejas.sort(() => Math.random() - 0.5); //desordenamos el array de pares
    });
  }

  public detectarFlip(idCartaLevantada: number, posCartaLevanta: any): void {
    //si no hay carta levantada entonces indicamos el id de la levantada
    if (this.idCartaSeleccionada == null) {
      this.idCartaSeleccionada = idCartaLevantada;
      this.posCartaSeleccionada = posCartaLevanta;
      return;
    }

    //si ya hay una carta levantada comparamos si se trata de un match
    if (idCartaLevantada == this.idCartaSeleccionada) {
      this.eliminarDeArray(this.idCartaSeleccionada); //eliminamos las cartas del array de parejas
      this.eliminarDeArray(this.idCartaSeleccionada); ///
      this.idCartaSeleccionada = null; //seteamos el id y la pos del referente como nulo
      this.posCartaSeleccionada = null;

      //por ultimo verificamos si el usuario gano
      this.verificarSiGano();
    } else {
      // si no son pareja entonces debemos voltear las dos cartas, eliminar la carta levantada

      this.parejas[this.posCartaSeleccionada].styleExp = 'rotateY(0deg)';
      this.parejas[posCartaLevanta].styleExp = 'rotateY(0deg)';

      this.parejas[this.posCartaSeleccionada].volteado = false;
      this.parejas[posCartaLevanta].volteado = false;

      this.idCartaSeleccionada = null;
      this.posCartaSeleccionada = null;
    }
  }

  private verificarSiGano() {
    if (this.parejas.length > 0) {
      // si el array aun tiene elementos entonces no se ha ganado
      return;
    }
    //si la validacion se paso entonces podemos mandar el punteo del usuario
    let body = new Object({
      //se contruye el body de la request con los datos recopilados en el funcionamineto del juego
      id: this.idJuego,
      jugador: this.usuarioJugador,
      tiempo: this.cronometro,
      punteo: 100,
    });

    this.juegoMemoriaService.guardarPunteoMemoria(body).subscribe((r: any) => {
      alert('GANASTE!! :) ' + r.respuesta);
      //redirigimos a la pantalla de inicio
      this.router.navigate([
        //navegamos al perfil del juego para que se puedan visualizar de nuevo los comentarios y records
        `menu-estudiante/juegos-perfil/${this.idJuego}/true`,
      ]);
    });
  }

  private eliminarDeArray(idPareja: any) {
    for (let x = 0; x < this.parejas.length; x++) {
      //si el idPareja enviado  coincide con el idPareja de un elemento en el array entonces procedemos a eliminar
      if (this.parejas[x].idPareja == idPareja) {
        //debemos eliminar las parejas del body
        this.parejas.splice(x, 1);
      }
    }
  }

  //Setea el tiempo del juego calculado por un componente encargado de eso
  public setCronometro(event: any): void {
    this.cronometro = event;
  }
}
