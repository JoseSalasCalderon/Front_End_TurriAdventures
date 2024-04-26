import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Core/LoginService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  contrasena: string ="";
  public error: boolean = false;
  

  constructor(private loginService: LoginService, private router:Router ) {}
  ngOnInit(): void {

  }



  iniciarSesion() {
    this.loginService.verificarCredenciales(this.usuario, this.contrasena)
      .subscribe(
        (response: any) => {
          // Inicio de sesión exitoso
          console.log('Inicio de sesión exitoso. ID de administrador:', response.idAdministrador);
          // Redirige a la página de inicio o realiza otras acciones necesarias
          this.router.navigate(['/']); // Redirige a la página de inicio
        },
        (error) => {
          // Error en el inicio de sesión
          console.log('Error en el inicio de sesión:', error);
          this.error = true; // Muestra un mensaje de error en el formulario
        }
      );
  }

  }

