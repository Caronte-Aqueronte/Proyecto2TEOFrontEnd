import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JuegoMemoriaService } from 'src/app/servicios/juego-memoria.service';

@Component({
  selector: 'app-juego-memoria',
  templateUrl: './juego-memoria.component.html',
  styleUrls: ['./juego-memoria.component.css'],
})
export class JuegoMemoriaComponent {
  public formIngresarPareja: FormGroup; //form para ingresar nueva pareja
  private usuarioCreador: string; //usuario que esta creando el juego
  public parejas: Array<any> = []; //array de parejas que se mostraran visualmente
  private parejasBody: Array<any> = []; //array de parejas que enviaremos al backend

  constructor(
    private formBuilder: FormBuilder,
    private cookiesService: CookieService,
    private juegoMemoriaService: JuegoMemoriaService
  ) {
    //obtener el nombre del usuario registrado
    this.usuarioCreador = this.cookiesService.get('usuario');
    //inicializamos el formulario
    this.formIngresarPareja = this.formBuilder.group({
      nombreJuego: ['', [Validators.required]],
      pareja1: ['', [Validators.required]],
      pareja2: ['', [Validators.required]],
    });
  }

  public crearJuegoMemoria(): void {
    if (this.parejasBody.length <= 2) {
      alert('Debe haber almenos dos parejas creadas');
      return;
    }

    let nombreJuego = this.formIngresarPareja.controls['nombreJuego'].value;
    let juego = new Object({
      usuarioCreador: this.usuarioCreador,
      nombre: nombreJuego,
      parejas: this.parejasBody,
    });
    this.juegoMemoriaService.crearJuegoMemoria(juego).subscribe((r: any) => {
      if (r.estado) {
        alert(r.respuesta + '\nEl codigo del juego es ' + r.codigoDeJuego); //mostramos el mensaje de confirmacion
        this.parejas = []; //vaciamos el array
        this.parejasBody = [];
        //borramos los txt
        this.formIngresarPareja.controls['pareja1'].setValue('');
        this.formIngresarPareja.controls['pareja2'].setValue('');
        this.formIngresarPareja.controls['nombreJuego'].setValue('');
      }
    });
  }

  public ingresarPareja(): void {
    const idPareja = this.parejas.length;
    //recaudamos los datos de los fields
    const pareja1 = this.formIngresarPareja.controls['pareja1'].value;
    const pareja2 = this.formIngresarPareja.controls['pareja2'].value;
    //agregamos un nuevo objeto de parejas al array de parejas
    this.parejas.push({
      idPareja: idPareja,
      pareja1: pareja1,
      pareja2: pareja2,
    });
    //agregamos el mismo objeto al array de parehjas del body
    this.parejasBody.push(
      { idPareja: idPareja, contenido: pareja1 /*pareja 1*/ },
      { idPareja: idPareja, contenido: pareja2 /*pareja 1*/ }
    );
    //borramos los txt
    this.formIngresarPareja.controls['pareja1'].setValue('');
    this.formIngresarPareja.controls['pareja2'].setValue('');
  }

  public eliminarPareja(idParejas: any, idParejasBody: any) {
    this.parejas.splice(idParejas, 1); //elimina un elemento del array de parejas respecto al id de la tarjeta precionada

    for (let x = 0; x < this.parejasBody.length; x++) {
      //si el idPareja enviado  coincide con el idPareja de un elemento en el array entonces procedemos a eliminar
      if (this.parejasBody[x].idPareja == idParejasBody) {
        //debemos eliminar las parejas del body
        this.parejasBody.splice(x, 2);
      }
    }
  }
}
