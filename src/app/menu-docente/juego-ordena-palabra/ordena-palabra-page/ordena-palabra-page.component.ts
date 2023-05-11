import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JuegoOrdenaPalabraService } from 'src/app/servicios/juego-ordena-palabra.service';

@Component({
  selector: 'app-ordena-palabra-page',
  templateUrl: './ordena-palabra-page.component.html',
  styleUrls: ['./ordena-palabra-page.component.css'],
})
export class OrdenaPalabraPageComponent {
  public formIngresarPalabra: FormGroup; //form para ingresar nueva palabra
  public palabras: Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    private cookiesService: CookieService,
    private juegoOrdenaPalabraService: JuegoOrdenaPalabraService
  ) {
    this.palabras = []; //inicializar el array queguarda las palabras
    this.formIngresarPalabra = this.formBuilder.group({
      nombreJuego: ['', [Validators.required]],
      palabra: ['', [Validators.required]],
      pista: ['', [Validators.required]],
    });
  }

  public guardarPalabra(): void {
    let palabra = this.formIngresarPalabra.controls['palabra'].value; //obtener el valor del campo palabra
    let pista = this.formIngresarPalabra.controls['pista'].value; //obtener el valor del campo pista

    this.palabras.push({ palabra: palabra, pista: pista });

    this.formIngresarPalabra.controls['palabra'].setValue('');
    this.formIngresarPalabra.controls['pista'].setValue('');
  }

  public eliminarPalabra(event: any) {
    this.palabras.splice(event, 1);
  }

  public crearJuegoOrdenaPalabra(): void {
    if (this.palabras.length <= 0) {
      alert('Debe haber almenos una palabra creada');
      return;
    }

    let usuario = this.cookiesService.get('usuario');
    let nombreJuego = this.formIngresarPalabra.controls['nombreJuego'].value;
    let juego = new Object({
      usuarioCreador: usuario,
      nombre: nombreJuego,
      palabras: this.palabras,
    });
    this.juegoOrdenaPalabraService
      .crearJuegoOrdenaPalabra(juego)
      .subscribe((r) => {
        if (r.estado) {
          alert(r.respuesta + '\nEl codigo del juego es ' + r.codigoDeJuego); //mostramos el mensaje de confirmacion
          this.palabras = []; //vaciamos el array
          this.formIngresarPalabra.controls[''].setValue(''); //liempiamos los campos
        }
      });
  }
}
