import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Habitacion } from '../Model/Habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private url: string = ""

  constructor(private http: HttpClient) {
    this.url = "https://localhost:7032/Habitaciones/";
  }

  ListarHabitaciones(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.url + "ListarHabitaciones");
  }
  
  ConsultarDisponibilidadHabitacion(fechaLlegada: string, fechaSalida: string, tipo_habitacion_id: number): Observable<Habitacion | null> {
    const params = new HttpParams()
      .set('fechaLlegada', fechaLlegada)
      .set('fechaSalida', fechaSalida)
      .set('tipo_habitacion_id', tipo_habitacion_id.toString());
      console.log('fechaLlegada', fechaLlegada, 'fechaSalida', fechaSalida, 'tipo_habitacion_id', tipo_habitacion_id.toString());
    console.log('habitacion disponible', this.http.get<Habitacion[]>(this.url + "ConsultarDisponibilidadHabitacion", { params }));
    return this.http.get<Habitacion[]>(this.url + "ConsultarDisponibilidadHabitaciones", { params }).pipe(
      map(habitaciones => habitaciones.length > 0 ? habitaciones[0] : null)
    );
  }

    ConsultarDisponibilidadHabitaciones(fechaLlegada: string, fechaSalida: string, tipo_habitacion_id: number): Observable<Habitacion[]> {
    const params = new HttpParams()
      .set('fechaLlegada', fechaLlegada)
      .set('fechaSalida', fechaSalida)
      .set('tipo_habitacion_id', tipo_habitacion_id.toString());
    console.log('service consultar', this.http.get<Habitacion[]>(this.url + "ConsultarDisponibilidadHabitaciones", { params }));
    return this.http.get<Habitacion[]>(this.url + "ConsultarDisponibilidadHabitaciones", { params });
  }

  BuscarHabitacionPorIdReserva(idReservacion: number): Observable<Habitacion> {
    return this.http.get<Habitacion>(this.url + "BuscarHabitacionPorIdReserva/"+idReservacion);
  }
 

}