import { Component, ViewChild, HostListener } from '@angular/core';
import { AdvertisementsComponent } from '../publicidad/advertisements.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AdvertisementsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar: any; // Agrega ViewChild para acceder al elemento del DOM
  
    toggleSidebar() {
      this.sidebar.nativeElement.classList.toggle('show'); // Alterna la clase .show en la barra lateral
      this.isOpen = !this.isOpen;
    }

  isOpen: boolean = false;

  constructor() {}

 
}

  