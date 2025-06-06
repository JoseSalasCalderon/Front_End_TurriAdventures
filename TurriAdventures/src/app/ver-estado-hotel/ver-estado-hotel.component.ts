import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ViewEncapsulation } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { Habitacion } from '../../Model/Habitacion';
import { HabitacionService } from '../../Core/HabitacionService';
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../Model/TipoHabitacion';


@Component({
  selector: 'app-ver-estado-hotel',
  standalone: true,
  templateUrl: './ver-estado-hotel.component.html',
  styleUrl: './ver-estado-hotel.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [HeaderComponent, SidebarAdministradorComponent]
})
export class VerEstadoHotelComponent implements OnInit {

  habitacionesPorPagina: number = 6;
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
  ){}

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones() {
    return this.HabitacionService.ListarHabitaciones().subscribe((habitaciones: Habitacion[]) => {
      const inicio = (this.paginaActual - 1) * this.habitacionesPorPagina;
      const fin = this.paginaActual * this.habitacionesPorPagina;
      this.TiposHabitacionService.ListarTiposHabitaciones().subscribe((tiposHabitaciones: TipoHabitacion[]) => {
        //Se carga la tabla
        this.cargarTabla(habitaciones, tiposHabitaciones, inicio, fin);
        //Se asignan los valores de las páginas a los botones
        this.actualizarPaginacion(habitaciones.length);
      });
    })
  }

  actualizarPaginacion(totalHabitaciones: number) {
    //Cantidad de páginas redondeado hacia arriba
    const totalPaginas = Math.ceil(totalHabitaciones / this.habitacionesPorPagina);
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
            this.obtenerHabitaciones();
        });
        paginacion.appendChild(botonPagina);
      }
    }
  }

  cargarTabla(habitaciones: Habitacion[], tiposHabitaciones: TipoHabitacion[], inicio:number, fin:number) {
    const tablaHabitaciones = document.getElementById("table-body");
    //Se valida para saber si existe y se genera este select
    if (tablaHabitaciones) {
      tablaHabitaciones.innerHTML = '';
      for (let i = inicio; i < fin && i < habitaciones.length; i++) {
        for (let j = 0; j < tiposHabitaciones.length; j++) {
          if (habitaciones[i].idTipoHabitacion === tiposHabitaciones[j].idTipoHabitacion) {
            tablaHabitaciones.innerHTML += `
              <tr>
                  <td>${habitaciones[i].numeroHabitacion}</td>
                  <td>${tiposHabitaciones[j].nombreTipoHabitacion}</td>
                  <td>${this.estadoHabitacion[habitaciones[i].estadoHabitacion]}</td>
              </tr>
            `;
            break;
          }
        }//for tiposHabitaciones
      }//For habitaciones
      const botonImprimir = document.getElementById("imprimir-estado-hotel");
      botonImprimir?.addEventListener("click", () =>{
        this.imprimirInforme(habitaciones, tiposHabitaciones);
      });
    }
  }

  imprimirInforme(habitaciones: Habitacion[], tiposHabitaciones: TipoHabitacion[]) {
    const printWindow = window.open('_blank','', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`${this.formatoInforme(habitaciones, tiposHabitaciones)}`);
      printWindow.document.close();

      //Le dice a la nueva ventana que se cierre se imprima o no
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    
      printWindow.print();
    }
  }

  formatoInforme(habitaciones: Habitacion[], tiposHabitaciones: TipoHabitacion[]): string{
    let datosHabitaciones = '';
    for (let i = 0; i < habitaciones.length; i++) {
      for (let j = 0; j < tiposHabitaciones.length; j++) {
        if (habitaciones[i].idTipoHabitacion === tiposHabitaciones[j].idTipoHabitacion) {
          datosHabitaciones += `
            <tr>
                <td>${habitaciones[i].numeroHabitacion}</td>
                <td>${tiposHabitaciones[j].nombreTipoHabitacion}</td>
                <td>${this.estadoHabitacion[habitaciones[i].estadoHabitacion]}</td>
            </tr>
          `;
          break;
        }
      }//for tiposHabitaciones
    }//For habitaciones

    return `
      <style>
        .container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .titulo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .fecha {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .table th, .table td {
          padding: 8px;
          border: 1px solid #ddd;
        }
      </style>
      <div class="container">
        <h1 class="titulo">Estado del Hotel</h1>
        <p class="fecha">Fecha: ${this.fechaFormateada}</p>
        <table class="table">
          <thead>
            <tr>
              <th>Número de Habitación</th>
              <th>Tipo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody id="tabla-body">${datosHabitaciones}</tbody>
        </table>
      </div>
    `;
  }

}

