import { Component, OnInit } from '@angular/core';
import { SidebarAdministradorComponent } from "../sidebar-administrador/sidebar-administrador.component";
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../Model/TipoHabitacion';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../Model/Habitacion';
import { HabitacionService } from '../../Core/HabitacionService';

@Component({
  selector: 'app-disponibilidad-habitaciones',
  standalone: true,
  templateUrl: './disponibilidad-habitaciones.component.html',
  styleUrl: './disponibilidad-habitaciones.component.css',
  imports: [SidebarAdministradorComponent, CommonModule]
})
export class DisponibilidadHabitacionesComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  listaTiposHabitacion: TipoHabitacion[] = [];
  mensaje: string = '';
  esError: boolean = false;
  fechaLlegada: string = '';
  fechaSalida: string = '';
  tipoHabitacion: number = 0;
  nombreTiposHabitacionMap: any;
  precioTiposHabitacionMap: any;
  tablaVisible: boolean = false;

  habitacionesPorPagina: number = 6;
  paginaActual: number = 1;

  constructor(
    private TipoHabitacionService: TipoHabitacionService,
    private habitacionService: HabitacionService,
  ) { }

  ngOnInit(): void {
    this.obtenerTiposHabitacion();
  }

  onInputChange(field: 'fechaLlegada' | 'fechaSalida' | 'tipoHabitacion', value: string | number) {
    if (field === 'fechaLlegada') {
      this.fechaLlegada = value as string;
    } else if (field === 'fechaSalida') {
      this.fechaSalida = value as string;
    } else if (field === 'tipoHabitacion') {
      this.tipoHabitacion = value as number;
    }
  }

  obtenerFechaActual(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = '' + (today.getMonth() + 1);
    let day = '' + today.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  obtenerTiposHabitacion() {
    this.TipoHabitacionService.ListarTiposHabitaciones().subscribe((data: TipoHabitacion[]) => {
      const formTiposHabitaciones = document.getElementById("tipoHabitacion");
      //Se valida para saber si existe y se genera este select
      if (formTiposHabitaciones) {

        formTiposHabitaciones.innerHTML = '';
        formTiposHabitaciones.innerHTML += `
        <option value="" disabled selected>Por favor seleccione el tipo de habitación de su preferencia</option>
      `;
        for (let index = 0; index < data.length; index++) {
          formTiposHabitaciones.innerHTML += `
            <option value="${data[index].idTipoHabitacion}">${data[index].nombreTipoHabitacion}</option>
          `;
        }
      }
      this.listaTiposHabitacion = data;

      // Crear un mapa para saber la información del tipo de habitación por su id
      this.nombreTiposHabitacionMap = {};
      data.forEach(tipo => {
        this.nombreTiposHabitacionMap[tipo.idTipoHabitacion] = tipo.nombreTipoHabitacion;
      });//nombreTipoHabitacion

      this.precioTiposHabitacionMap = {};
      data.forEach(tipo => {
        this.precioTiposHabitacionMap[tipo.idTipoHabitacion] = tipo.precio;
      });//precio

    });


  }

  camposValidos(): boolean {
    return !!this.fechaLlegada && !!this.fechaSalida && !!this.tipoHabitacion;
  }

  async onSubmit() {
    if (this.camposValidos()) {
      this.listarHabitaciones();
      this.tablaVisible = true;
    }
    else {
      this.mensaje = 'Por favor revisa el formato de los campos';
      this.esError = true;
      setTimeout(() => {
        this.mensaje = '';
      }, 3000);
      return;
    }
  }


  listarHabitaciones() {
    return this.habitacionService.ConsultarDisponibilidadHabitaciones(this.fechaLlegada, this.fechaSalida, this.tipoHabitacion)
      .subscribe(habitaciones => {
        const inicio = (this.paginaActual - 1) * this.habitacionesPorPagina;
        const fin = this.paginaActual * this.habitacionesPorPagina;
        const tablaHabitaciones = document.getElementById("table-body");
        //Se valida para saber si existe y se genera este select
        if (tablaHabitaciones) {
          tablaHabitaciones.innerHTML = '';

          for (let i = inicio; i < fin && i < habitaciones.length; i++) {
            for (let j = 0; j < this.listaTiposHabitacion.length; j++) {
              if (habitaciones[i].idTipoHabitacion === this.listaTiposHabitacion[j].idTipoHabitacion) {
                tablaHabitaciones.innerHTML += `
                <tr>
                <td>${habitaciones[i].numeroHabitacion}</td>
                <td>${this.nombreTiposHabitacionMap[habitaciones[i].idTipoHabitacion]}</td>
                <td>${this.precioTiposHabitacionMap[habitaciones[i].idTipoHabitacion]}</td>
            </tr>
                `;
                break;
              }
            }//for tiposHabitaciones
          }



        }

        this.actualizarPaginacion(habitaciones.length);
      });
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
          this.listarHabitaciones();
        });
        paginacion.appendChild(botonPagina);
      }
    }
  }
}

