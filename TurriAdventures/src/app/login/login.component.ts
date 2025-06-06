import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Core/LoginService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Model/Login';
import { CommonModule } from '@angular/common';


let dataLogin: Login;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  contrasena: string ="";
  public entrar: boolean;
  public error: boolean = false;
  

  constructor(private loginService: LoginService, private router:Router,  ) {
    this.entrar = false;

  }
  ngOnInit(): void {

  }

  buttonInicioSesion(): void {
    if (this.usuario.trim().length === 0 || this.contrasena.trim().length === 0) {
      this.errorMessage = 'Por favor, completa ambos campos.';
      return;
    }
  
    this.error = false;
    this.errorMessage = ''; // Limpiar mensaje de error previo
  
    console.log("Nombre" + this.usuario);
    console.log("Contrasennia" + this.contrasena);
    this.buscarUsuario(this.usuario, this.contrasena);
  }
  
  buscarUsuario(usuario: string, contrasena: string) {
    if (usuario.trim().length !== 0 && contrasena.trim().length !== 0) {
      this.loginService.buscarUsuario({ usuario, contrasena }).subscribe((data: any) => {
        console.log(data);
        dataLogin = new Login(data.id,data.usuario, data.contrasena);
        if (dataLogin.ID != null) {
          console.log(dataLogin.ID);
          sessionStorage.setItem('id', dataLogin.ID.toString());
          sessionStorage.setItem('usuario', dataLogin.usuario);
          this.router.navigate(['/homeAdmin']);
        } else {
          this.errorMessage = 'El nombre de usuario o la contraseña son incorrectos.';
        }
      }, error => {
        console.error('Error en la solicitud:', error);
        this.errorMessage = 'Hubo un problema al procesar la solicitud.';
      });
    } else {
      console.log("Buscar" + usuario.length);
    }
  }
  

  
  logout(){
    this.loginService.logout();
  }


  public errorMessage: string = '';

  }


