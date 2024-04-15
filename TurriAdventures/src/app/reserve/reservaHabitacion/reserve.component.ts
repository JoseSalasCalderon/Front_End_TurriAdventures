import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { HeaderComponent } from "../../header/header.component";
import { DatosCompartidosService } from '../DatosCompartidosService';

import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve',
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
  imports: [SidebarComponent, HeaderComponent]
})
export class ReserveComponent {
  datos: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: string } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: '' };

  constructor(
    private datosCompartidosService: DatosCompartidosService,
    private router: Router
  ) { }

  onInputChange(field: 'fechaLlegada' | 'fechaSalida' | 'tipoHabitacion', value: string) {
    this.datos[field] = value;
    this.datosCompartidosService.setDatosReserve(this.datos);
  }

  onSubmit() {
    if (this.camposValidos()) {
      this.router.navigate(['/reserva']);
    }
  }

  camposValidos(): boolean {
    return !!this.datos.fechaLlegada && !!this.datos.fechaSalida && !!this.datos.tipoHabitacion;
  }

  
}