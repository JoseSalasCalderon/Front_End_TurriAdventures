import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosCompartidosService {
  private datosReserva: { nombre: string, apellidos: string, email: string } = { nombre: '', apellidos: '', email: '' };
  private datosReservaClient: { idCliente: string, tarjetaCredito: string } = { idCliente: '', tarjetaCredito: '' };
  private datosReserve: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: 0 };
  private contadorReservaciones: number = 0;

  datosReservaActualizados: EventEmitter<{ nombre: string, apellidos: string, email: string }> = new EventEmitter<{ nombre: string, apellidos: string, email: string }>();
  datosReservaClientActualizados: EventEmitter<{ idCliente: string, tarjetaCredito: string }> = new EventEmitter<{ idCliente: string, tarjetaCredito: string }>();
  datosReserveActualizados: EventEmitter<{ fechaLlegada: string, fechaSalida: string, tipoHabitacion: number }> = new EventEmitter<{ fechaLlegada: string, fechaSalida: string, tipoHabitacion: number }>();

  setDatosReserva(datos: { nombre: string, apellidos: string, email: string }) {
    this.datosReserva = datos;
    this.datosReservaActualizados.emit(datos);
  }

  getDatosReserva() {
    return this.datosReserva;
  }

  setDatosReservaConfirm(datos: { idCliente: string, tarjetaCredito: string , vencimiento: string}) {
    this.datosReservaClient = datos;
    this.datosReservaClientActualizados.emit(datos);
  }

  getDatosReservaConfirm() {
    return this.datosReservaClient;
  }

  setDatosReserve(datos: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number }) {
    this.datosReserve = datos;
    this.datosReserveActualizados.emit(datos);
  }

  getDatosReserve() {
    return this.datosReserve;
  }

  getNumeroReservacion(): number {
    return this.contadorReservaciones;
  }

  incrementarReservacion(): void {
    this.contadorReservaciones++;
  }
}
