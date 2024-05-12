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
      this.HabitacionService.ListarHabitaciones().subscribe((habitaciones: Habitacion[]) => {
        this.TiposHabitacionService.ListarTiposHabitaciones().subscribe((tiposHabitaciones: TipoHabitacion[]) => {
          this.ClienteService.ListarCliente().subscribe((clientes: Cliente[]) => {
            //Se carga la tabla
            this.cargarTabla(habitaciones, tiposHabitaciones, reservas, clientes, inicio, fin);
            //Se asignan los valores de las páginas a los botones
            this.actualizarPaginacion(reservas.length);
          });
        });
      });
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

  cargarTabla(habitaciones: Habitacion[], tiposHabitaciones: TipoHabitacion[], reservas: Reserva[], clientes: Cliente[], inicio:number, fin:number) {
    const tablaHabitaciones = document.getElementById("table-body");
    //Se valida para saber si existe y se genera este select
    if (tablaHabitaciones) {
      tablaHabitaciones.innerHTML = '';
      for (let k = inicio; k < fin && k < reservas.length; k++) {
        for (let i = 0; i < habitaciones.length; i++) {
          for (let j = 0; j < tiposHabitaciones.length; j++) {
            for (let l = 0; l < clientes.length; l++) {
              if (reservas[k].idHabitacion === habitaciones[i].idHabitacion &&
                  habitaciones[i].idTipoHabitacion === tiposHabitaciones[j].idTipoHabitacion &&
                  reservas[k].idCliente === clientes[l].idCliente) {

                tablaHabitaciones.innerHTML += `
                  <tr>
                      <td>${this.fechaFormateada}</td>
                      <td>${reservas[k].idReservacion}</td>
                      <td>${clientes[l].nombre}</td>
                      <td>${clientes[l].apellidos}</td>
                      <td>${clientes[l].email}</td>
                      <td>${reservas[k].fechaLlegada}</td>
                      <td>${reservas[k].fechaSalida}</td>
                      <td>${tiposHabitaciones[j].nombreTipoHabitacion}</td>
                      <td><button type="button" class="btn btn-primary">Ver</button></td>
                      <td><button type="button" class="btn btn-danger">Eliminar</button></td>
                  </tr>
                `;
                break;
              }//if
            }//for clientes
          }//for tiposHabitaciones
        }//For habitaciones
        
      }
    }
  };

}
