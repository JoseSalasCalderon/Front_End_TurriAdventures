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
  
    constructor(private datosCompartidosService: DatosCompartidosService) { }
  
    ngOnInit(): void {
      this.datosReserva = this.datosCompartidosService.getDatosReserva();
    }

     generarCodigo(): string {
      const caracteres = '123';
      const longitud = 1;
      let codigo = '';
    
      for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
      }
      console.log(codigo);

      return codigo;
    }
     numeroReservacion = this.generarCodigo();
  }
