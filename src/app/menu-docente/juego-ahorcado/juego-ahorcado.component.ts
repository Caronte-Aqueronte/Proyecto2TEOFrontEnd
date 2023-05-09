import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AhorcadoService } from 'src/app/servicios/ahorcado.service';

@Component({
  selector: 'app-juego-ahorcado',
  templateUrl: './juego-ahorcado.component.html',
  styleUrls: ['./juego-ahorcado.component.css'],
})
export class JuegoAhorcadoComponent {
  public formIngresarPalabra: FormGroup; //form para ingresar nueva palabra
  private usuarioCreador: string;
  constructor(
    private formBuilder: FormBuilder,
    private cookiesService: CookieService,
    private ahorcadoService: AhorcadoService
  ) {
    //obtener el nombre del usuario registrado
    this.usuarioCreador = this.cookiesService.get('usuario');
    //inicializamos el formulario
    this.formIngresarPalabra = this.formBuilder.group({
      nombreJuego: ['', [Validators.required]],
      palabra: ['', [Validators.required]],
      pista: ['', [Validators.required]],
    });
  }

  public crearJuegoAhorcado(): void {
    //extraer los valores de las propiedades del juego de los componentes del form
    const nombreJuego = this.formIngresarPalabra.controls['nombreJuego'].value;
    const palabra = this.formIngresarPalabra.controls['palabra'].value;
    const pista = this.formIngresarPalabra.controls['pista'].value;
    let body = new Object({
      //crear el body de la consulta con los datos recabados
      usuarioCreador: this.usuarioCreador,
      nombre: nombreJuego,
      palabrasAhorcado: [{ palabra: palabra, pista: pista }],
    });
    this.ahorcadoService.crearJuegoAhorcado(body).subscribe((r) => {
      if (r.estado) {
        alert(r.respuesta + '\nEl codigo del juego es ' + r.codigoDeJuego); //mostramos el mensaje de confirmacion
        //borramos los campos
        this.formIngresarPalabra.controls['palabra'].setValue("");
        this.formIngresarPalabra.controls['nombreJuego'].setValue("");
        this.formIngresarPalabra.controls['pista'].setValue("");
      }
    });
  }
}
