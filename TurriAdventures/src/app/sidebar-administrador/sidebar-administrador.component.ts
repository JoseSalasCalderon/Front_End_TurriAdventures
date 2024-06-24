import { Component, ViewChild } from '@angular/core';
import { AdvertisementsComponent } from '../publicidad/advertisements.component';



@Component({
  selector: 'app-sidebar-administrador',
  standalone: true,
  imports: [AdvertisementsComponent],
  templateUrl: './sidebar-administrador.component.html',
  styleUrl: './sidebar-administrador.component.css'
})
export class SidebarAdministradorComponent {
  @ViewChild('sidebar') sidebar: any; // Agrega ViewChild para acceder al elemento del DOM
  
    toggleSidebar() {
      this.sidebar.nativeElement.classList.toggle('show'); // Alterna la clase .show en la barra lateral
      this.isOpen = !this.isOpen;
    }

  isOpen: boolean = false;

  constructor() {}
}
