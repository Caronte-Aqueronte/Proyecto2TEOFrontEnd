import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AhorcadoService } from 'src/app/servicios/ahorcado.service';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';

@Component({
  selector: 'app-jugar-ahorcado',
  templateUrl: './jugar-ahorcado.component.html',
  styleUrls: ['./jugar-ahorcado.component.css'],
})
export class JugarAhorcadoComponent {
  //numero de segundos que envia el cronometro
  public cronometro: number = 0;

  public errores: number = 0;
  public intentos: number = -1;
  public datosJuego: any = null;
  public usuarioJugador: string = '';
  public idJuego: string = '';

  public palabra: string = '';
  //array que guardara la palabra deconstruida
  public palabraDeconstruida: Array<any> = [];
  //pista que se mostrara al usuario
  public pista: string = '';

  constructor(
    private juegosService: JuegoServiceService,
    private ahorcadoService: AhorcadoService,
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

      this.palabra = this.datosJuego.palabrasAhorcado[0].palabra;
      const palabraDeconstruida = this.palabra.split(''); //deconstruir la palabra y guardarla en una constante temporal

      //debemos desplazarnos por el array agregar una bandera que indicara si la letra ha sido encontrada
      for (let x = 0; x < palabraDeconstruida.length; x++) {
        //por cada una de las letras enviamos un nuevo objeto al array palabraDeconstruida con la letra y el estado encontrado en false
        this.palabraDeconstruida.push({
          letra: palabraDeconstruida[x],
          encontrado: false,
        });
      }

      this.pista = this.datosJuego.palabrasAhorcado[0].pista;

      console.log(this.palabraDeconstruida);
    });
  }

  public probarLetra() {
    //obtenemos la letra del input de letra
    let letraIntento = (<HTMLInputElement>document.getElementById('letra'))
      .value;
    (<HTMLInputElement>document.getElementById('letra')).value = ''; //borramos la entrada
    //verificamos qu ela letra no sea vacia, este nula o sea mas de una letra\
    if (!letraIntento || letraIntento.length > 1 || letraIntento == '') {
      alert('Letra invalida');
      return;
    }
    this.intentos++; //sumamos uno a los intentos
    //mandamos a verificar dentro del array la letra en cuestion
    this.verificarLetra(letraIntento);
    //verificamos si perdio
    this.verficiarSiPerdio();
    //si la verificacion es positiva entonces gano y debemos mandar el punteo del usuario, notificar y redirigir
    if (this.verificarSiGano()) {
      this.terminarIntento(); //mandamos a guardar el punteo del jugador
    }
  }

  private terminarIntento(): void {
    let body = new Object({
      //se contruye el body de la request con los datos recopilados en el funcionamineto del juego
      id: this.idJuego,
      jugador: this.usuarioJugador,
      tiempo: this.cronometro,
      punteo: (8 - this.intentos),
    });
    this.ahorcadoService.guardarPunteoAhorcado(body).subscribe((r) => {
      alert('GANASTE!! :), La palabra es: ' + this.palabra + ' ' + r.respuesta);
      //redirigimos a la pantalla de inicio
      this.router.navigate([
        //navegamos al perfil del juego para que se puedan visualizar de nuevo los comentarios y records
        `menu-estudiante/juegos-perfil/${this.idJuego}`,
      ]);
    });
  }

  private verificarLetra(letra: string): void {
    let banderaAcierto = false;
    //por cada elemento del array evaluar si la letra existe
    for (let x = 0; x < this.palabraDeconstruida.length; x++) {
      if (this.palabraDeconstruida[x].letra == letra) {
        banderaAcierto = true;
        //si la letra se encunetra en el array entonces la podemos mostrar
        this.palabraDeconstruida[x].encontrado = true;
      }
    }
    //si la bandera de acierto nunca se activo entonces se trata de un error y aumentamos el contador de errores
    if (!banderaAcierto) {
      this.errores++;
    }
  }

  private verficiarSiPerdio(): void {
    if (this.errores == 8) {
      //si los errores son 8 entonces el usuario perido
      this.errores = 0;
      alert('Perdiste :(');

      this.router.navigate([
        //navegamos al perfil del juego para que se puedan visualizar de nuevo los comentarios y records
        `menu-estudiante/juegos-perfil/${this.idJuego}`,
      ]);
    }
  }

  private verificarSiGano(): boolean {
    //para verificar si el usuario gano entonces debemos verificar las banderas de entoncrado de las letras del array palabraDeconstruida
    for (let x = 0; x < this.palabraDeconstruida.length; x++) {
      if (this.palabraDeconstruida[x].encontrado == false) {
        return false;
      }
    }
    return true;
  }

  /**
   * Recibe la actualizacion de los segundos que el cronometro esta calculando
   * @param milis
   */
  public setCronometro(milis: any): void {
    this.cronometro = milis;
  }
}
