import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Reserva } from '../Models/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7032/Reservacions/ListarReservas";
   }


   getList():Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.url);
}




}
