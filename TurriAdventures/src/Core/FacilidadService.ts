import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Facilidad } from '../Model/Facilidad'; 

@Injectable({
  providedIn: 'root'
})
export class FacilidadService {

  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7032/api/Facilidad/";
  }

  ListarFacilidades():Observable<Facilidad[]>{
    return this.http.get<Facilidad[]>(this.url+"ListarFacilidades");
  }
  CrearFacilidad(facilidad: Facilidad): Observable<any> {
    return this.http.post<any>(this.url + "CrearFacilidad", facilidad);
  }

  EditarFacilidad(facilidad: Facilidad): Observable<any> {
    return this.http.put<any>(this.url + "EditarFacilidad", facilidad);
  }

  EliminarFacilidad(id: number): Observable<any> {
    return this.http.delete(this.url + `EliminarFacilidad/${id}`);
  }
}