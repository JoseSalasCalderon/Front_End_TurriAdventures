import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { HeaderComponent } from "../../header/header.component";
import { DatosCompartidosService } from '../DatosCompartidosService';
import { ReservationService } from '../../../Core/ReservaService';
import { Reserva } from '../../../Model/Reserva';
import { TipoHabitacionService } from '../../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../../Model/TipoHabitacion';
import { Router } from '@angular/router';
import { HabitacionService } from '../../../Core/HabitacionService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserve',
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
  imports: [CommonModule, SidebarComponent, HeaderComponent]
})

export class ReserveComponent implements OnInit {
  listaReservas: Reserva[] = [];
  listaTiposHabitacion: TipoHabitacion[] = [];
  datos: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: 0 };
  habitacion: any;
  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private datosCompartidosService: DatosCompartidosService,
    private ReservationService: ReservationService,
    private TipoHabitacionService: TipoHabitacionService,
    private habitacionService: HabitacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerReservas();
    this.obtenerTiposHabitacion();
  }

  onInputChange(field: 'fechaLlegada' | 'fechaSalida' | 'tipoHabitacion', value: string | number) {
    (this.datos as any)[field] = value;
    this.datosCompartidosService.setDatosReserve(this.datos);
  }

  async onSubmit() {
    if (this.camposValidos()) {
      if (await this.validarDisponibilidad()) {
        this.habitacion = await this.habitacionService.ConsultarDisponibilidadHabitacion(this.datos.fechaLlegada, this.datos.fechaSalida, this.datos.tipoHabitacion).toPromise();

        const queryParams = {
          fechaLlegada: this.datos.fechaLlegada,
          fechaSalida: this.datos.fechaSalida,
          habitacionId: this.habitacion.idHabitacion, 
        };
        console.log('habitacionId en reserve', this.habitacion.idHabitacion)
        console.log('queryParams para reserva', queryParams);
        this.router.navigate(['/reserva'], { queryParams: { ...this.datos, habitacionId: this.habitacion.idHabitacion } });
      }
      else {
        const { disponible, fechaLlegada, fechaSalida } = await this.buscarRangoFechasDisponible();
        if (disponible) {
          this.router.navigate(['/reservanodisponible'], {
            queryParams: {
              fechaLlegada: fechaLlegada,
              fechaSalida: fechaSalida
            }
          });
        }
      }//if-else disponibilidad
    } else {
      this.mensaje = 'Por favor revisa el formato.';
      this.esError = true;
      setTimeout(() => {
          this.mensaje = '';
      }, 3000);
      return;    }
  }

  camposValidos(): boolean {
    return !!this.datos.fechaLlegada && !!this.datos.fechaSalida && !!this.datos.tipoHabitacion;
  }

  async validarDisponibilidad(): Promise<boolean> {
    const habitacionDisponible = await this.habitacionService.ConsultarDisponibilidadHabitacion(this.datos.fechaLlegada, this.datos.fechaSalida, this.datos.tipoHabitacion).toPromise();
    if (habitacionDisponible) {
      console.log('habitacionDisponible', habitacionDisponible);
      return true;
    } else {
      this.buscarRangoFechasDisponible();
      return false;
    }
  }

  async buscarRangoFechasDisponible(): Promise<{ disponible: boolean, fechaLlegada: string, fechaSalida: string }> {
    let nuevaFechaLlegada = new Date(this.datos.fechaLlegada);
    let nuevaFechaSalida = new Date(this.datos.fechaSalida);
    let diasRecorridos = 0;

    while (diasRecorridos <= 15) {//cambiarlo
      //Incrementar la fecha de llegada y salida
      nuevaFechaLlegada.setDate(nuevaFechaLlegada.getDate() + diasRecorridos);
      nuevaFechaSalida.setDate(nuevaFechaSalida.getDate() + diasRecorridos);

      // Consulta la disponibilidad para las nuevas fechas
      const disponibilidad = await this.habitacionService.ConsultarDisponibilidadHabitacion(
        nuevaFechaLlegada.toISOString().slice(0, 10),
        nuevaFechaSalida.toISOString().slice(0, 10),
        this.datos.tipoHabitacion
      ).toPromise();

      if (disponibilidad !== null) {
        return { disponible: true, fechaLlegada: nuevaFechaLlegada.toISOString().slice(0, 10), fechaSalida: nuevaFechaSalida.toISOString().slice(0, 10) };
      }
      diasRecorridos++;
    }
    return { disponible: false, fechaLlegada: '', fechaSalida: '' };
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


  obtenerReservas() {
    return this.ReservationService.ListarReservas().subscribe((data: Reserva[]) => {
      this.listaReservas = data;
      console.log('obtenerReservas', data);

    })
  };

  obtenerTiposHabitacion() {
    return this.TipoHabitacionService.ListarTiposHabitaciones().subscribe((data: TipoHabitacion[]) => {
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
      console.log('listaTiposHabitacion', data);

    })
  }
}