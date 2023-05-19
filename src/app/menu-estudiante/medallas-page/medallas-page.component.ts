import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PunteoService } from 'src/app/servicios/punteo.service';

@Component({
  selector: 'app-medallas-page',
  templateUrl: './medallas-page.component.html',
  styleUrls: ['./medallas-page.component.css'],
})
export class MedallasPageComponent {
  displayedColumns: string[] = [
    'nombreJuego',
    'tipo',
    'punteo',
    'tiempo',
    'fecha',
  ];
  dataSource = [];
  public medallas = [];
  constructor(
    private punteoService: PunteoService,
    private cookiesService: CookieService
  ) {
    this.traerHistorialDeJuego();
    this.traerMedallasDeUsuario();
  }

  public traerHistorialDeJuego(): void {
    let usuario = this.cookiesService.get('usuario'); //obtenemos el nombre del usuario
    //usar el servicio para mandar a traer los historiales de juego del usuario
    this.punteoService.traerHistorialDeJuego(usuario).subscribe((respuesta) => {
      this.dataSource = respuesta.historial; //la respuesta tiene el atributo historial adentro... lo igualamos al data source de la tabla
    });
  }

  public traerMedallasDeUsuario(): void {
    let usuario = this.cookiesService.get('usuario'); //obtenemos el nombre del usuario
    //usar el servicio para mandar a traer los historiales de juego del usuario
    this.punteoService
      .traerMedallasDeUsuario(usuario)
      .subscribe((respuesta) => {
        console.log(respuesta);
        this.medallas = respuesta.medallasUsuario; //la respuesta tiene el atributo historial adentro... lo igualamos al data source de la tabla
      });
  }
}
