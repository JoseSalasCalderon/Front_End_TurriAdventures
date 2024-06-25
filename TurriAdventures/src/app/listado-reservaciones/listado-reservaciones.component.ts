import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-reservaciones',
  standalone: true,
  templateUrl: './listado-reservaciones.component.html',
  styleUrls: ['./listado-reservaciones.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, HeaderComponent, SidebarAdministradorComponent]
})
export class ListadoReservacionesComponent implements OnInit {
  
  successMessage: string | null = null;
  reservacionesPorPagina: number = 6;
  paginaActual: number = 1;

  fechaActual: Date = new Date();
  fechaFormateada = `
    ${String(this.fechaActual.getDate()).padStart(2, '0')}/
    ${String(this.fechaActual.getMonth() + 1).padStart(2, '0')}/
    ${this.fechaActual.getFullYear().toString()}
  `;

  estadoHabitacion: { [key: number]: string } = {
    0: 'DISPONIBLE',
    1: 'RESERVADA',
    2: 'OCUPADA'
  };

  constructor(
    private HabitacionService: HabitacionService,
    private TiposHabitacionService: TipoHabitacionService,
    private ReservaService: ReservationService,
    private ClienteService: ClienteService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.obtenerReservaciones();
  }

  obtenerReservaciones() {
    return this.ReservaService.ListarReservas().subscribe((reservas: Reserva[]) => {
      const inicio = (this.paginaActual - 1) * this.reservacionesPorPagina;
      const fin = this.paginaActual * this.reservacionesPorPagina;
      this.cargarTabla(reservas, inicio, fin);
      this.actualizarPaginacion(reservas.length);
    });
  };

  actualizarPaginacion(totalHabitaciones: number) {
    const totalPaginas = Math.ceil(totalHabitaciones / this.reservacionesPorPagina);
    const paginacion = this.el.nativeElement.querySelector("#pagination");
    if (paginacion) {
      paginacion.innerHTML = "";
      for (let i = 1; i <= totalPaginas; i++) {
        const botonPagina = this.renderer.createElement("button");
        this.renderer.addClass(botonPagina, "btn");
        this.renderer.addClass(botonPagina, "btn-secondary");
        this.renderer.addClass(botonPagina, "mr-2");
        botonPagina.textContent = String(i);
        this.renderer.listen(botonPagina, 'click', () => {
          this.paginaActual = i;
          this.obtenerReservaciones();
        });
        this.renderer.appendChild(paginacion, botonPagina);
      }
    }
  }

  eliminar(idReserva: number): void {
    this.ReservaService.EliminarReserva(idReserva).subscribe(response => {
      if (response) {
        this.successMessage = 'La reserva fue eliminada correctamente.';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
        this.obtenerReservaciones();
      }
    });
  }

  cargarTabla(reservas: Reserva[], inicio: number, fin: number) {
    const tablaHabitaciones = this.el.nativeElement.querySelector("#table-body");
    if (tablaHabitaciones) {
      tablaHabitaciones.innerHTML = '';
      for (let index = inicio; index < fin && index < reservas.length; index++) {
        this.HabitacionService.BuscarHabitacionPorIdReserva(reservas[index].idReservacion).subscribe((habitacion: Habitacion) => {
          this.TiposHabitacionService.BuscarTipoHabitacionPorIdHabitacion(habitacion.idHabitacion).subscribe((tipoHabitacion: TipoHabitacion) => {
            this.ClienteService.BuscarClientePorIdReserva(reservas[index].idReservacion).subscribe((cliente: Cliente) => {
              const fila = this.renderer.createElement('tr');
  
              const celdaFecha = this.renderer.createElement('td');
              celdaFecha.innerHTML = this.fechaFormateada;
              this.renderer.appendChild(fila, celdaFecha);
  
              const celdaId = this.renderer.createElement('td');
              celdaId.innerHTML = String(reservas[index].idReservacion);
              this.renderer.appendChild(fila, celdaId);
  
              const celdaNombre = this.renderer.createElement('td');
              celdaNombre.innerHTML = cliente.nombre;
              this.renderer.appendChild(fila, celdaNombre);
  
              const celdaApellidos = this.renderer.createElement('td');
              celdaApellidos.innerHTML = cliente.apellidos;
              this.renderer.appendChild(fila, celdaApellidos);
  
              const celdaEmail = this.renderer.createElement('td');
              celdaEmail.innerHTML = cliente.email;
              this.renderer.appendChild(fila, celdaEmail);
  
              const celdaFechaLlegada = this.renderer.createElement('td');
              celdaFechaLlegada.innerHTML = reservas[index].fechaLlegada;
              this.renderer.appendChild(fila, celdaFechaLlegada);
  
              const celdaFechaSalida = this.renderer.createElement('td');
              celdaFechaSalida.innerHTML = reservas[index].fechaSalida;
              this.renderer.appendChild(fila, celdaFechaSalida);
  
              const celdaTipoHabitacion = this.renderer.createElement('td');
              celdaTipoHabitacion.innerHTML = tipoHabitacion.nombreTipoHabitacion;
              this.renderer.appendChild(fila, celdaTipoHabitacion);
  
              const celdaVer = this.renderer.createElement('td');
              const botonVer = this.renderer.createElement('button');
              this.renderer.addClass(botonVer, 'btn');
              this.renderer.addClass(botonVer, 'btn-primary');
              botonVer.innerHTML = 'Ver';
              this.renderer.listen(botonVer, 'click', () => {
                this.router.navigate(['/ver-reserva', reservas[index].idReservacion]);
              });
              this.renderer.appendChild(celdaVer, botonVer);
              this.renderer.appendChild(fila, celdaVer);
  
              const celdaEliminar = this.renderer.createElement('td');
              const botonEliminar = this.renderer.createElement('button');
              this.renderer.addClass(botonEliminar, 'btn');
              this.renderer.addClass(botonEliminar, 'btn-danger');
              botonEliminar.innerHTML = 'Eliminar';
              this.renderer.listen(botonEliminar, 'click', () => this.eliminar(reservas[index].idReservacion));
              this.renderer.appendChild(celdaEliminar, botonEliminar);
              this.renderer.appendChild(fila, celdaEliminar);
  
              this.renderer.appendChild(tablaHabitaciones, fila);
            });
          });
        });
      }
    }
  }
  
}
