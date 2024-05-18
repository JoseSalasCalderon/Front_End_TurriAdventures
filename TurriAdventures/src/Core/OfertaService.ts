import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Oferta } from '../Model/Oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {


  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7032/Temporadas/";
   }

   ListarOfertas():Observable<Oferta[]>{
    return this.http.get<Oferta[]>('https://localhost:7032/Ofertas/ListarOfertas');
  }//ListarTemporadas

  CrearOfertas(oferta: any): Observable<any> {
    return this.http.post('https://localhost:7032/Ofertas/CrearOferta?descripcionOferta='+oferta.descripcionOferta+'&fechaInicioOferta='+oferta.fechaInicioOferta+'&fechaFinalOferta='+oferta.fechaFinalOferta+'&precioOferta='+oferta.precioOferta, oferta);
  }


  modificarOferta(data: any): Observable<any> {
    const url = 'https://localhost:7032/Ofertas/EditarOferta?idOferta='+data.idOferta+'&descripcionOferta='+data.descripcionOferta+'&fechaInicioOferta='+data.fechaInicioOferta+'&fechaFinalOferta='+data.fechaFinalOferta+'&precioOferta='+data.precioOferta;
    return this.http.put(url, data);
  }
  

ObtenerOferta(id: string): Observable<any> {
  return this.http.get<any>(`https://localhost:7032/Ofertas/BuscarOferta/${id}`);
}



}
