import { Component } from '@angular/core';
import { CargadorService } from '../servicios/cargador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 


  constructor(private cargadorService:CargadorService){
    this.cargadorService.cargarScript(["login"]);
  }
}
