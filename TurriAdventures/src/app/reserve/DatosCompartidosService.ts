import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosCompartidosService {
  private datosReserve: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: 0 };
  private datosCliente: { idCliente: string, nombre: string, apellidos: string, email: string } = { idCliente: '', nombre: '', apellidos: '', email: ''};

  setDatosCliente(datos: {  idCliente: string, nombre: string, apellidos: string, email: string}) {
    this.datosCliente = datos;
  }

  setDatosReserve(datos: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number }) {
    this.datosReserve = datos;
  }

  getDatosReserve() {
    return this.datosReserve;
  }

  getDatosCliente() {
    return this.datosCliente;
  }
 
}
