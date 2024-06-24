import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Reserva } from '../Model/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7032/Reservacions/";
   }

   ListarReservas():Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.url+'ListarReservas');
    }//ListarReservas

    CrearReserva(reserva: Reserva): Observable<any> {      
      return this.http.post(this.url + 'CrearReserva', reserva);
    }//CrearReserva

    EliminarReserva(idReservacion: number): Observable<any> {
      return this.http.delete(this.url + 'EliminarReserva?idReserva='+ idReservacion);
    }
  
}
