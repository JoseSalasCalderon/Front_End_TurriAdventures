import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs';
import { Publicidad } from '../Model/Publicidad';

@Injectable({
    providedIn: 'root'
})
export class PublicidadService {

    private url: string = ""

    constructor(private http: HttpClient) {
        this.url =
            "https://localhost:7032/api/Publicidads/";

    }

    ListarPublicidades(): Observable<Publicidad[]> {
        return this.http.get<Publicidad[]>(this.url + "ListarPublicidades");
    }

    CrearPublicidad(publicidad: Publicidad): Observable<any> {      
        return this.http.post(this.url + 'CrearPublicidad', publicidad);
    }

    SubirImagen(imagen: File): Observable<any> {
        const formData = new FormData();
        formData.append('imagen', imagen);
        return this.http.post<any>(this.url + 'SubirImagen', formData);
    }

   EditarPublicidad(publicidad: Publicidad): Observable<any> {
    return this.http.put(`${this.url}EditarPublicidad`, publicidad);
  }

    EliminarPublicidad(idPublicidad: number): Observable<any> {
        return this.http.delete(`${this.url}EliminarPublicidad/${idPublicidad}`);
    }
    
    BuscarPublicidadPorId(idPublicidad: number): Observable<Publicidad> {
        return this.http.get<Publicidad>(`${this.url}BuscarPublicidad/${idPublicidad}`);
      }

      BuscarPublicidadPorNombre(nombrePublicidad: String): Observable<Publicidad> {
        return this.http.get<Publicidad>(this.url+"BuscarPublicidadPorNombre/"+nombrePublicidad);
      }

    //   BuscarCliente(idCliente: String):Observable<Cliente>{
    //     return this.http.get<Cliente>(this.url+"BuscarCliente/"+idCliente);
    //   }
}