import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Direccion } from '../Model/Direccion'; 

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7032/api/Direccion/";
  }

  ListarDirecciones():Observable<Direccion[]>{
    return this.http.get<Direccion[]>(this.url+"ListarDirecciones");
  }

  BuscarDireccion(idDireccion: number): Observable<Direccion> {
    return this.http.get<Direccion>(this.url + "BuscarDireccion/"+idDireccion);
  }

  ActualizarDireccion(direccion: Direccion ): Observable<any> {
    return this.http.put(`${this.url}EditarDireccion`, direccion);
  }

}