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

@Component({
  selector: 'app-reserve',
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
  imports: [SidebarComponent, HeaderComponent]
})
export class ReserveComponent implements OnInit {
  listaEstados: Reserva[] = [];
  listaTiposHabitacion: TipoHabitacion[] = [];
  datos: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: 0 };
  reservas: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: string }[] = [];

  constructor(
    private datosCompartidosService: DatosCompartidosService,
    private ReservationService: ReservationService,
    private TipoHabitacionService: TipoHabitacionService,
    private habitacionService: HabitacionService, // Agrega el servicio de HabitacionService
    private router: Router
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const datosGuardados = localStorage.getItem('datosReserva');
      if (datosGuardados) {
        this.datos = JSON.parse(datosGuardados);
      } const reservasGuardadas = localStorage.getItem('reservas');
      if (reservasGuardadas) {
        this.reservas = JSON.parse(reservasGuardadas);
      }
    }

    this.obtenerEstados();
    this.obtenerTiposHabitacion();
  }

  onInputChange(field: 'fechaLlegada' | 'fechaSalida' | 'tipoHabitacion', value: string | number) {
    (this.datos as any)[field] = value;
    this.datosCompartidosService.setDatosReserve(this.datos);
    localStorage.setItem('datosReserva', JSON.stringify(this.datos));
  }

  async onSubmit() {
    if (this.camposValidos() && await this.validarDisponibilidad()) {
      this.reservas.push({ ...this.datos, tipoHabitacion: this.datos.tipoHabitacion.toString() });
      localStorage.setItem('reservas', JSON.stringify(this.reservas));

      //aumentar el codigo
      let contadorReservas = localStorage.getItem('contadorReservas');
      if (!contadorReservas) {
        contadorReservas = '1';
      } else {
        contadorReservas = (parseInt(contadorReservas) + 1).toString();
      }
      localStorage.setItem('contadorReservas', contadorReservas);

      this.router.navigate(['/reserva']);

    } else {
      const { disponible, fechaLlegada, fechaSalida } = await this.buscarRangoFechasDisponible();
      if (disponible) {
        this.router.navigate(['/reservanodisponible'], {
          queryParams: {
            fechaLlegada: fechaLlegada,
            fechaSalida: fechaSalida
          }
        });
        
        console.log('Fechas disponibles dentro de los próximos 15 días', fechaLlegada, fechaSalida);
      } else {
        console.log('No hay fechas disponibles dentro de los próximos 15 días');
      }
    }
  }

  camposValidos(): boolean {
    return !!this.datos.fechaLlegada && !!this.datos.fechaSalida && !!this.datos.tipoHabitacion;
  }

  async validarDisponibilidad(): Promise<boolean> {
    const habitacionDisponible = await this.habitacionService.ConsultarDisponibilidadHabitaciones(this.datos.fechaLlegada, this.datos.fechaSalida, this.datos.tipoHabitacion).toPromise();

    if (habitacionDisponible) {
      // Habitación disponible
      console.log('Habitación disponible');
      return true;
    } else {
      // Habitación no disponible
      console.log('Habitación no disponible');
      this.buscarRangoFechasDisponible();
      return false;
    }
  }

  async buscarRangoFechasDisponible(): Promise<{ disponible: boolean, fechaLlegada: string, fechaSalida: string }> {
    let nuevaFechaLlegada = new Date(this.datos.fechaLlegada);
    let nuevaFechaSalida = new Date(this.datos.fechaSalida);
    let diasRecorridos = 0;

    while (diasRecorridos <= 15) {
      //Incrementar la fecha de llegada y salida
      nuevaFechaLlegada.setDate(nuevaFechaLlegada.getDate() + diasRecorridos);
      nuevaFechaSalida.setDate(nuevaFechaSalida.getDate() + diasRecorridos);

      // Consulta la disponibilidad para las nuevas fechas
      const disponibilidad = await this.habitacionService.ConsultarDisponibilidadHabitaciones(
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


  obtenerEstados() {
    return this.ReservationService.getList().subscribe((data: Reserva[]) => {
      console.log(data);
      this.listaEstados = data;

    })
  };

  obtenerTiposHabitacion() {
    return this.TipoHabitacionService.ListarTiposHabitaciones().subscribe((data: TipoHabitacion[]) => {
      const formTiposHabitaciones = document.getElementById("tipoHabitacion");
      //Se valida para saber si existe y se genera este select
      if (formTiposHabitaciones) {
        formTiposHabitaciones.innerHTML = '';
        for (let index = 0; index < data.length; index++) {
          formTiposHabitaciones.innerHTML += `
            <option value="${data[index].idTipoHabitacion}">${data[index].nombreTipoHabitacion}</option>
          `;
        }
      }
      console.log(data);
      this.listaTiposHabitacion = data;
    })
  }
}