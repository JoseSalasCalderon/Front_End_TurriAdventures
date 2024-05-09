import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-vista-habitaciones',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent, FooterComponent],
  templateUrl: './vista-habitaciones.component.html',
  styleUrl: './vista-habitaciones.component.css'
})
export class VistaHabitacionesComponent  {


  // roomType: any;
  // roomDetails: any; 

}
