import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ComentarioService } from 'src/app/servicios/comentario.service';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private rutaActiva: ActivatedRoute,
    private juegoService: JuegoServiceService,
    private comentarioService: ComentarioService,
    private cookiesService: CookieService,
    private formBuilder: FormBuilder
  ) {
    this.id = this.rutaActiva.snapshot.params['id']; //obtenemos el id del juego ha mostrar
    this.traerJuegoPorId();
    this.traerComentariosDeJuego();
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
        console.log(r);
        //vemos si la respuesta no es nula
        this.comentarios = r;
      }
    });
  }
}
