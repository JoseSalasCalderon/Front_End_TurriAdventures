import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Core/LoginService';
import { Login } from '../../Model/Login';

let dataLogin: Login;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  contrasena: string = "";
  public entrar: boolean;
  public error: boolean = false;
  public loginErrorMessage: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {
    this.entrar = false;
  }

  ngOnInit(): void { }

  buttonInicioSesion(): void {
    if (this.usuario.trim().length === 0 || this.contrasena.trim().length === 0) {
      this.error = true;
      return;
    }

    this.error = false;
    this.buscarUsuario(this.usuario, this.contrasena);
  }

  buscarUsuario(usuario: string, contrasena: string) {
    if (usuario.trim().length !== 0 && contrasena.trim().length !== 0) {
      this.loginService.buscarUsuario({ usuario, contrasena }).subscribe({
        next: (data: any) => {
          dataLogin = new Login(data.id, data.usuario, data.contrasena);
          if (dataLogin.ID != null) {
            sessionStorage.setItem('id', dataLogin.ID.toString());
            sessionStorage.setItem('usuario', dataLogin.usuario);
            this.router.navigate(['/homeAdmin']);
          } else {
            this.mostrarMensajeError("El nombre de usuario o la contraseña son incorrectos");
          }
        },
        error: () => {
          this.mostrarMensajeError("El nombre de usuario o la contraseña son incorrectos");
        }
      });
    }
  }

  mostrarMensajeError(mensaje: string) {
    this.loginErrorMessage = mensaje;
    setTimeout(() => {
      this.loginErrorMessage = null;
    }, 3000);
  }

  logout() {
    this.loginService.logout();
  }
}
