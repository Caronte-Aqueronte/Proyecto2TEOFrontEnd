import { Component } from '@angular/core';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-juegos-creados',
  templateUrl: './juegos-creados.component.html',
  styleUrls: ['./juegos-creados.component.css']
})
export class JuegosCreadosComponent {
  public cards: Array<any>;
  public usuario: any;

  constructor(private juegoService: JuegoServiceService, private cookiesService: CookieService) {
    this.cards = [];
    this.usuario = this.cookiesService.get('usuario');
    console.log(this.usuario);

    this.traerJuegoPorUsuario();
    this.mostrarJuegos();
  }

  ngOnInit(): void { }

  public mostrarJuegos(): void {
    this.juegoService.mostrarJuegos().subscribe((r) => {
      this.cards = r;//igualamos el array al array devuelto por el backend
    });
  }

  public traerJuegoPorUsuario(): void {
    //mandamos a traer el tipo del juego por el id
    this.juegoService.MostrarJuegosporUsuario(this.usuario).subscribe((r) => {
      this.cards = r;
    });
  }
}
