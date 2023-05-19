import { Component } from '@angular/core';
import { LogoutService } from 'src/app/servicios/logout.service';

@Component({
  selector: 'app-nav-estudiante',
  templateUrl: './nav-estudiante.component.html',
  styleUrls: ['./nav-estudiante.component.css']
})
export class NavEstudianteComponent {


  constructor(private logout:LogoutService){

  }

  public logOut():void{
    this.logout.logout();//mandamos a eliminar la cookie de usuario
  }
}
