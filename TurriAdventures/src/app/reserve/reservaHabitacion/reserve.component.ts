import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { HeaderComponent } from "../../header/header.component";
import { DatosCompartidosService } from '../DatosCompartidosService';
import { ReservationService } from '../../../Core/ReservaService';
import { Reserva } from '../../../Model/Reserva';
import { TipoHabitacionService } from '../../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../../Model/TipoHabitacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve',
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
  imports: [SidebarComponent, HeaderComponent]
})
export class ReserveComponent implements OnInit {
  listaEstados:Reserva[]=[];
  listaTiposHabitacion:TipoHabitacion[]=[];
  datos: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: string } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: '' };
  reservas: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: string }[] = [];

  constructor(
    private datosCompartidosService: DatosCompartidosService,
    private ReservationService: ReservationService,
    private TipoHabitacionService: TipoHabitacionService,
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
    console.log("Steven");
  }

  onInputChange(field: 'fechaLlegada' | 'fechaSalida' | 'tipoHabitacion', value: string) {
    this.datos[field] = value;
    this.datosCompartidosService.setDatosReserve(this.datos);
    localStorage.setItem('datosReserva', JSON.stringify(this.datos));
  }

  onSubmit() {
    if (this.camposValidos() && this.validarDisponibilidad()) {
      this.reservas.push({ ...this.datos });
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
      this.router.navigate(['/reservanodisponible']);
    }
  }

  camposValidos(): boolean {
    return !!this.datos.fechaLlegada && !!this.datos.fechaSalida && !!this.datos.tipoHabitacion;
  }

  validarDisponibilidad(): boolean {
    for (const reserva of this.reservas) {
      if (reserva.tipoHabitacion === this.datos.tipoHabitacion) {
        const fechaLlegadaReserva = new Date(reserva.fechaLlegada);
        const fechaSalidaReserva = new Date(reserva.fechaSalida);
        const fechaLlegadaNueva = new Date(this.datos.fechaLlegada);
        const fechaSalidaNueva = new Date(this.datos.fechaSalida);

        if (
          (fechaLlegadaNueva >= fechaLlegadaReserva && fechaLlegadaNueva < fechaSalidaReserva) ||
          (fechaSalidaNueva > fechaLlegadaReserva && fechaSalidaNueva <= fechaSalidaReserva)
        ) {
          return false;
        }
      }
    }
    return true;
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
    return this.TipoHabitacionService.ListarHabitaciones().subscribe((data: TipoHabitacion[]) => {
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