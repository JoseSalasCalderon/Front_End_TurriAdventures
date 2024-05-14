import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ViewEncapsulation } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../Model/TipoHabitacion';

@Component({
  selector: 'app-ver-tipo-habitacion',
  standalone: true,
  templateUrl: './ver-tipo-habitacion.component.html',
  styleUrl: './ver-tipo-habitacion.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, HeaderComponent, SidebarAdministradorComponent]
})
export class VerTipoHabitacionComponent implements OnInit{
  
  tipoHabitacionSeleccionada: TipoHabitacion | null = null;

  constructor(
    private TiposHabitacionService: TipoHabitacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscarTipoHabitacion();
  }

  buscarTipoHabitacion() {
    //Llamar a la variable en sesión
    const tipoHabitacionSeleccionada = sessionStorage.getItem('TipoHabitacionSeleccionada');
    if (tipoHabitacionSeleccionada) {
      const tipoHabitacionInt = parseInt(tipoHabitacionSeleccionada);
      //Inicializar el tipoHabitacion
      this.TiposHabitacionService.BuscarTipoHabitacionPorId(tipoHabitacionInt).subscribe((tipoHabitacion: TipoHabitacion) => {
        this.tipoHabitacionSeleccionada = tipoHabitacion;
      })
    }
  }

  volverAdministrarHabitaciones() {
    this.router.navigate(['/administrarHabitaciones']);
  }

}
