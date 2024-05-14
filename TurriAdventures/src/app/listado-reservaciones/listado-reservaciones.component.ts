import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ViewEncapsulation } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { Habitacion } from '../../Model/Habitacion';
import { HabitacionService } from '../../Core/HabitacionService';
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../Model/TipoHabitacion';
import { ReservationService } from '../../Core/ReservaService';
import { Reserva } from '../../Model/Reserva';
import { ClienteService } from '../../Core/ClienteService';
import { Cliente } from '../../Model/Cliente';

@Component({
  selector: 'app-listado-reservaciones',
  standalone: true,
  templateUrl: './listado-reservaciones.component.html',
  styleUrl: './listado-reservaciones.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [HeaderComponent, SidebarAdministradorComponent]
})
export class ListadoReservacionesComponent implements OnInit{
  
  reservacionesPorPagina: number = 6;
  paginaActual: number = 1;

  fechaActual: Date = new Date();
  //Con el padStart se asegura que sean siempre dos dígitos, y si es un se ponde un 0 al principio
  fechaFormateada = `
    ${String(this.fechaActual.getDate()).padStart(2, '0')}/
    ${String(this.fechaActual.getMonth() + 1).padStart(2, '0')}/
    ${this.fechaActual.getFullYear().toString()}
  `;

  //Es necesario decirle que la key sea de tipo number para que admita dicho parámetro
  estadoHabitacion: { [key: number]: string } = {
    0: 'DISPONIBLE',
    1: 'RESERVADA',
    2: 'OCUPADA'
  };

  constructor(
    private HabitacionService: HabitacionService,
    private TiposHabitacionService: TipoHabitacionService,
    private RerervaService: ReservationService,
    private ClienteService: ClienteService
  ){}

  ngOnInit(): void {
    this.obtenerReservaciones();
  }

  obtenerReservaciones() {
    return this.RerervaService.ListarReservas().subscribe((reservas: Reserva[]) => {
      const inicio = (this.paginaActual - 1) * this.reservacionesPorPagina;
      const fin = this.paginaActual * this.reservacionesPorPagina;
      //Se carga la tabla
      this.cargarTabla(reservas, inicio, fin);
      //Se asignan los valores de las páginas a los botones
      this.actualizarPaginacion(reservas.length);
    });
  };

  actualizarPaginacion(totalHabitaciones: number) {
    //Cantidad de páginas redondeado hacia arriba
    const totalPaginas = Math.ceil(totalHabitaciones / this.reservacionesPorPagina);
    const paginacion = document.getElementById("pagination");
    if (paginacion) {
      paginacion.innerHTML = "";
      //Crear botones por página
      for (let i = 1; i <= totalPaginas; i++) {
        const botonPagina = document.createElement("button");
        //Estilo con boostrap
        botonPagina.classList.add("btn", "btn-secondary", "mr-2");
        //Número del botón como tal
        botonPagina.textContent = String(i);
        //Agrega el evento click y el actualizar recursivo
        botonPagina.addEventListener("click", () => {
            this.paginaActual = i;
            this.obtenerReservaciones();
        });
        paginacion.appendChild(botonPagina);
      }
    }
  }

  cargarTabla(reservas: Reserva[], inicio:number, fin:number) {
    const tablaHabitaciones = document.getElementById("table-body");
    //Se valida para saber si existe y se genera este select
    if (tablaHabitaciones) {
      tablaHabitaciones.innerHTML = '';
      for (let index = inicio; index < fin && index < reservas.length; index++) {
        this.HabitacionService.BuscarHabitacionPorIdReserva(reservas[index].idReservacion).subscribe((habitacion: Habitacion) => {
          this.TiposHabitacionService.BuscarTipoHabitacionPorIdHabitacion(habitacion.idHabitacion).subscribe((tipoHabitacion: TipoHabitacion) => {
            this.ClienteService.BuscarClientePorIdReserva(reservas[index].idReservacion).subscribe((cliente: Cliente) => {
              tablaHabitaciones.innerHTML += `
                  <tr>
                      <td>${this.fechaFormateada}</td>
                      <td>${reservas[index].idReservacion}</td>
                      <td>${cliente.nombre}</td>
                      <td>${cliente.apellidos}</td>
                      <td>${cliente.email}</td>
                      <td>${reservas[index].fechaLlegada}</td>
                      <td>${reservas[index].fechaSalida}</td>
                      <td>${tipoHabitacion.nombreTipoHabitacion}</td>
                      <td><button type="button" class="btn btn-primary">Ver</button></td>
                      <td><button type="button" class="btn btn-danger">Eliminar</button></td>
                  </tr>
                `;
            });
          });
        });
      } // For reservas
    }
  };

}
