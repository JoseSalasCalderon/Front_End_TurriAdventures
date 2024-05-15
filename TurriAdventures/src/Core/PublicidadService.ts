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

    EditarPublicidad(publicidad: Publicidad): Observable<any> {
        return this.http.put(`${this.url}EditarPublicidad`, publicidad);
    }


    EliminarPublicidad(id: number): Observable<any> {
        return this.http.delete(`${this.url}EliminarPublicidad/${id}`);
    }
}