import { Component } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home-administrador',
  standalone: true,
  imports: [SidebarAdministradorComponent, HeaderComponent],
  templateUrl: './home-administrador.component.html',
  styleUrl: './home-administrador.component.css'
})
export class HomeAdministradorComponent {

}
