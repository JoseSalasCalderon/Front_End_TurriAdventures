import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Temporada } from '../Model/Temporada';

@Injectable({
  providedIn: 'root'
})
export class TemporadaService {


  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7032/Temporadas/";
   }

   ListarTemporadas():Observable<Temporada[]>{
    return this.http.get<Temporada[]>(this.url+'ListarTemporadas');
  }//ListarTemporadas

  CrearTemporadas(temporada: any): Observable<any> {
    return this.http.post('https://localhost:7032/Temporadas/CrearTemporada?descripcionTemporada='+temporada.descripcionTemporada+'&fechaInicioTemporada='+temporada.fechaInicioTemporada+'&fechaFinalTemporada='+temporada.fechaFinalTemporada+'&precioTemporada='+temporada.precioTemporada, temporada);
  }


  modificarTemporada(data: any): Observable<any> {
    const url = `https://localhost:7032/Temporadas/EditarTemporada?idTemporada=${data.idTemporada}&descripcionTemporada=${data.descripcionTemporada}&fechaInicioTemporada=${data.fechaInicioTemporada}&fechaFinalTemporada=${data.fechaFinalTemporada}&precioTemporada=${data.precioTemporada}`;
    return this.http.put(url, data);
  }
  

ObtenerTemporada(id: string): Observable<any> {
  return this.http.get<any>(`https://localhost:7032/Temporadas/BuscarTemporada/${id}`);
}



}
