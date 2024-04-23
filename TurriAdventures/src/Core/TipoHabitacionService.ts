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


  ListarHabitaciones():Observable<TipoHabitacion[]>{
    return this.http.get<TipoHabitacion[]>(this.url+"ListarTipoHabitaciones");
  }




}