import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
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
 
  ConsultarDisponibilidadHabitaciones(fechaLlegada: string, fechaSalida: string, tipo_habitacion_id: number): Observable<Habitacion[]> {
    const params = new HttpParams()
      .set('fechaLlegada', fechaLlegada)
      .set('fechaSalida', fechaSalida)
      .set('tipo_habitacion_id', tipo_habitacion_id.toString());
    console.log('service consultar', this.http.get<Habitacion[]>(this.url + "ConsultarDisponibilidadHabitaciones", { params }));
    return this.http.get<Habitacion[]>(this.url + "ConsultarDisponibilidadHabitaciones", { params });
  }

 
  // ConsultarDisponibilidadHabitaciones(fechaLlegada: string, fechaSalida: string, tipo_habitacion_id: number): Observable<{ habitaciones: Habitacion[], habitacionId: string }> {
  //   const params = new HttpParams()
  //     .set('fechaLlegada', fechaLlegada)
  //     .set('fechaSalida', fechaSalida)
  //     .set('tipo_habitacion_id', tipo_habitacion_id.toString());
  //   console.log('Id habitacion',this.http.get<{ habitaciones: Habitacion[], habitacionId: string }>(this.url + "ConsultarDisponibilidadHabitaciones", { params }));
  //   return this.http.get<{ habitaciones: Habitacion[], habitacionId: string }>(this.url + "ConsultarDisponibilidadHabitaciones", { params });
  // }

}