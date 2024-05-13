import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ViewEncapsulation } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { Habitacion } from '../../Model/Habitacion';
import { HabitacionService } from '../../Core/HabitacionService';
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../Model/TipoHabitacion';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-habitaciones',
  standalone: true,
  templateUrl: './administrar-habitaciones.component.html',
  styleUrl: './administrar-habitaciones.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, HeaderComponent, SidebarAdministradorComponent]
})
export class AdministrarHabitacionesComponent implements OnInit{

  habitaciones: Habitacion[] = [];
  tiposHabitaciones: TipoHabitacion[] = [];

  //Es necesario decirle que la key sea de tipo number para que admita dicho parámetro
  estadoHabitacion: { [key: number]: string } = {
    0: 'DISPONIBLE',
    1: 'RESERVADA',
    2: 'OCUPADA'
  };

  constructor(
    private HabitacionService: HabitacionService,
    private TiposHabitacionService: TipoHabitacionService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.obtenerHabitaciones();
    this.obtenerTiposHabitacion();
  }

  editarTipoHabitacion(idTipoHabitacion: number) {
    sessionStorage.setItem('TipoHabitacionSeleccionada', idTipoHabitacion.toString());
    this.router.navigate(['/verTipoHabitacion']);
  }

  obtenerHabitaciones() {
    return this.HabitacionService.ListarHabitaciones().subscribe((habitaciones: Habitacion[]) => {
      this.habitaciones = habitaciones;
    })
  }

  obtenerTiposHabitacion() {
    return this.TiposHabitacionService.ListarTiposHabitaciones().subscribe((tiposHabitacion: TipoHabitacion[]) => {
      this.tiposHabitaciones = tiposHabitacion;
    })
  }
}
