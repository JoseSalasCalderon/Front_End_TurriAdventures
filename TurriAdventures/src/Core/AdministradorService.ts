import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, throwError } from 'rxjs';
import { Administrador } from '../Model/Administrador';

@Injectable({
    providedIn: 'root'
})
export class AdministradorService {

    private url: string = ""

    constructor(private http: HttpClient) {
        this.url =
            "https://localhost:7032/api/Administrador/";

    }

    ListarAdministradores(): Observable<Administrador[]> {
        return this.http.get<Administrador[]>(this.url + "ListarAdministradores");
    }

    CrearAdministrador(administrador: Administrador): Observable<any> {      
        return this.http.post(this.url + 'CrearAdministrador', administrador);
    }

    EditarAdministrador(administrador: Administrador): Observable<any> {
        return this.http.put(`${this.url}EditarAdministrador`, administrador);
    }


    EliminarAdministrador(id: number): Observable<any> {
        return this.http.delete(`${this.url}EliminarAdministrador/${id}`);
    }

    verificarExistenciaUsuario(usuario: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.url}BuscarAdministrador/${usuario}`);
    }
}