import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TipoHabitacion } from '../Model/TipoHabitacion';

@Injectable({
  providedIn: 'root'
})
export class TipoHabitacionService {

  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7032/TiposHabitaciones/";
  }


  ListarTiposHabitaciones():Observable<TipoHabitacion[]>{
    return this.http.get<TipoHabitacion[]>(this.url+"ListarTipoHabitaciones");
  }

  BuscarTipoHabitacionPorId(idTipoHabitacion: number): Observable<TipoHabitacion> {
    return this.http.get<TipoHabitacion>(this.url + "BuscarTipoHabitacion/"+idTipoHabitacion);
  }

  BuscarTipoHabitacionPorIdHabitacion(idHabitacion: number): Observable<TipoHabitacion> {
    return this.http.get<TipoHabitacion>(this.url + "BuscarTipoHabitacionPorHabitacion/"+idHabitacion);
  }

  ActualizarTipoHabitacion(tipoHabitacion: TipoHabitacion): Observable<any> {
    return this.http.put(`${this.url}EditarTipoHabitacion`, tipoHabitacion);
  }

}