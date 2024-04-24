import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Habitacion } from '../Model/Horario';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7032/Habitaciones/";
  }

  ListarHabitaciones():Observable<Habitacion[]>{
    return this.http.get<Habitacion[]>(this.url+"ListarHabitaciones");
  }

}