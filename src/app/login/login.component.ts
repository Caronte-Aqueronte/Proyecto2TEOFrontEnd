import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup; //form para el login
  public formRegistro: FormGroup; //form para el regirstro

  public mensajeLogin: any;
  public mensajeCreate: any;

  public banderaErrorLogin: any;
  public banderaAcietoLogin: any;

  public banderaErrorCreate: any;
  public banderaAciertoCreate: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private cookiesService: CookieService
  ) {
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
      rol: ['', [Validators.required]],
    });
  }

  public login(): void {
    //volver banderas de confirmacion a false
    this.banderaAcietoLogin = false;
    this.banderaErrorLogin = false;

    //utilizar el servicio para la creacion de un usuario
    this.usuarioService.login(this.formLogin.value).subscribe((r) => {
      if (r.estado) {
        let usuario = this.formLogin.controls['correoElectronico'].value;
        this.cookiesService.set('usuario', usuario);
        if (r.respuesta.rol == 'Profesor') {
          this.router.navigate(['/menu-docente']);
        } else if (r.respuesta.rol == 'Estudiante') {
          this.router.navigate(['/menu-estudiante/juegos']);
        }
      } else {
        this.banderaErrorLogin = true;
      }

      this.mensajeLogin = r.respuesta;
    });
  }

  public crearUsuario(): void {
    //volver banderas de confirmacion a false
    this.banderaAciertoCreate = false;
    this.banderaErrorCreate = false;
    //obtener los valores de la primera y segunda password
    const password1 = this.formRegistro.controls['password'].value;
    const password2 = this.formRegistro.controls['password2'].value;
    //ver si las dos password son iguales
    if (password1 != password2) {
      this.banderaErrorCreate = true;
      this.mensajeCreate = 'Las contraseñas no coinciden.';
      return;
    }

    //utilizar el servicio para la creacion de un usuario
    this.usuarioService.crearUsuario(this.formRegistro.value).subscribe((r) => {
      if (r.estado) {
        this.banderaAciertoCreate = true;
      } else {
        this.banderaErrorCreate = true;
      }

      this.mensajeCreate = r.respuesta;
    });
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
