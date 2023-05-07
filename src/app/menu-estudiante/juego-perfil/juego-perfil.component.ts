import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ComentarioService } from 'src/app/servicios/comentario.service';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { PunteoService } from 'src/app/servicios/punteo.service';


@Component({
  selector: 'app-juego-perfil',
  templateUrl: './juego-perfil.component.html',
  styleUrls: ['./juego-perfil.component.css'],
})
export class JuegoPerfilComponent {
  public id: any;
  public juego: any;
  public comentarios: any;

  public formComentario: FormGroup; //formulario de comentarios

  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private juegoService: JuegoServiceService,
    private comentarioService: ComentarioService,
    private punteoService: PunteoService,
    private cookiesService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.id = this.rutaActiva.snapshot.params['id']; //obtenemos el id del juego ha mostrar
    this.traerJuegoPorId();
    this.traerComentariosDeJuego();
    this.traerRankingDeUnJuego();
    //se dan validaciones a los campos de crear un comentario
    this.formComentario = this.formBuilder.group({
      comentario: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  public traerJuegoPorId(): void {
    //mandamos a traer el tipo del juego por el id
    this.juegoService.buscarJuegoPorId(this.id).subscribe((r) => {
      this.juego = r;
    });
  }

  /**
   * Envia un comentario nuevo para que sea ingresado a la base de datos
   */
  public nuevoComentario(): void {
    //traemos el usuario comentador
    let usuario = this.cookiesService.get('usuario');
    //obtenemos el valor del comentario
    let contenido = this.formComentario.controls['comentario'].value;
    //creamos un nuevo objeto que adjunte el id del juego seguido del contenido del comentario
    let nuevoComentario = new Object({
      usuarioJugador: usuario,
      codigoDelJuego: this.id,
      comentario: contenido,
    });

    //mandamos ha insertar el nuevo comentario al backend
    this.comentarioService.nuevoComentario(nuevoComentario).subscribe((r) => {
      //reseteamos el valor del div
      this.formComentario.controls['comentario'].setValue('');
      //mandamos a mostrar los comentarios del juego
      if (r && r.estado == true) {
        this.traerComentariosDeJuego();
      }
    });
  }

  public traerComentariosDeJuego(): void {
    this.comentarioService.traerComentariosDeJuego(this.id).subscribe((r) => {
      if (r) {
        //vemos si la respuesta no es nula
        this.comentarios = r;
      }
    });
  }

  /**
   * Redirige a la pagina de juego del juego
   */
  public toJugar(): void {
    switch (this.juego.tipo) {
      case 'Ordena palabra':
        this.router.navigate([
          `/menu-estudiante/jugar-ordena-palabra/${this.id}`,
        ]);

        break;
    }
  }

  public traerRankingDeUnJuego(): void {
    this.punteoService.traerRankingDeUnJuego(this.id).subscribe((r) => {
      this.dataSource = r.ranking;
      console.log(r);
    });
  }
}
