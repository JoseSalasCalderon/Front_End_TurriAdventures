import { Component } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../Core/LoginService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-administrador',
  standalone: true,
  imports: [SidebarAdministradorComponent, HeaderComponent],
  templateUrl: './home-administrador.component.html',
  styleUrl: './home-administrador.component.css'
})
export class HomeAdministradorComponent {
  
  constructor(
    private router:Router,
    private loginService:LoginService) { }
    nombre: string = this.loginService.isAuthenticated( ) ? sessionStorage.getItem('usuario') ?? 'Usuario' : 'Usuario';
    
 logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
