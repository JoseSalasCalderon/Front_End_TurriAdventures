import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { DatosCompartidosService } from '../DatosCompartidosService';

@Component({
    selector: 'app-confirmarreserva',
    standalone: true,
    templateUrl: './confirmarreserva.component.html',
    styleUrl: './confirmarreserva.component.css',
    imports: [SidebarComponent]
})
export class ConfirmarreservaComponent implements OnInit {
    datosReserva: { nombre: string, apellidos: string, email: string } = { nombre: '', apellidos: '', email: '' };
    numeroReservacion: string='';

    constructor(private datosCompartidosService: DatosCompartidosService) { }
  
    ngOnInit(): void {
      this.datosReserva = this.datosCompartidosService.getDatosReserva();
      this.numeroReservacion = localStorage.getItem('contadorReservas') || '1';
    }

  }
