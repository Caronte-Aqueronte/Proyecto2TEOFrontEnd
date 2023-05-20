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

  }

  ngOnInit(): void { }

  public traerJuegoPorUsuario(): void {
    //mandamos a traer el tipo del juego por el id
    this.juegoService.MostrarJuegosporUsuario(this.usuario).subscribe((r) => {
      this.cards = r;
    });
  }
}
