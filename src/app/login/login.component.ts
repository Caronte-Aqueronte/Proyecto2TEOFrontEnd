import { Component, OnInit } from '@angular/core';
import { CargadorService } from '../servicios/cargador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;//form para el login
  public formRegistro: FormGroup;//form para el regirstro

  constructor(private cargadorService: CargadorService, private formBuilder:FormBuilder) {
   this.formLogin = this.formBuilder.group({
    correoElectronico: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.maxLength(256),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ],
    ],
   });

//iniciando el formulario de registro
   this.formRegistro = this.formBuilder.group({
    correoElectronico: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.maxLength(256),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ],
    ],
    password2: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ],
    ],
    rol: [
      '',
      [
        Validators.required,
      ],
    ],
   });
  }

  public login():void{

  }
  
  public registrarUsuario() :void{

  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  /**
   * Manejo de DOM
   */
  contenedor: any;
  formulario_login: any;
  formulario_registro: any;
  parteFijaLogin: any;
  parteFijaRegistro: any;

  ngOnInit(): void {
    this.contenedor = document.querySelector('.Login_Registro') as HTMLElement;
    this.formulario_login = document.querySelector(
      '.FormularioLogin'
    ) as HTMLElement;
    this.formulario_registro = document.querySelector(
      '.FormularioRegistro'
    ) as HTMLElement;
    this.parteFijaLogin = document.querySelector('.login') as HTMLElement;
    this.parteFijaRegistro = document.querySelector('.registro') as HTMLElement;
  }

  cambioARegistro() {
    this.formulario_registro.style.display = 'block';
    this.contenedor.style.left = '410px';
    this.formulario_login.style.display = 'none';
    this.parteFijaRegistro.style.opacity = '0';
    this.parteFijaLogin.style.opacity = '1';
  }

  cambioAInciarSesion() {
    this.formulario_login.style.display = 'block';
    this.contenedor.style.left = '10px';
    this.formulario_registro.style.display = 'none';
    this.parteFijaRegistro.style.opacity = '1';
    this.parteFijaLogin.style.opacity = '0';
  }
}
