import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs';
import { Home, Publicidad } from '../Model/Home';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    private url: string = ""

    constructor(private http: HttpClient) {
        this.url =
            "https://localhost:7032/api/Home/";

    }

    ListarHomes(): Observable<Home[]> {
        return this.http.get<Home[]>(this.url + "ListarHomes");
    }

    CrearPublicidad(home: Home): Observable<any> {      
        return this.http.post(this.url + 'CrearHome', home);
    }

    SubirImagen(imagen: File): Observable<any> {
        const formData = new FormData();
        formData.append('imagen', imagen);
        return this.http.post<any>(this.url + 'SubirImagen', formData);
    }

   EditarHome(home: Home): Observable<any> {
    return this.http.put(`${this.url}EditarHome`, home);
  }

    EliminarHome(idHome: number): Observable<any> {
        return this.http.delete(`${this.url}EliminarHome/${idHome}`);
    }
    
    BuscarHomePorId(idHome: number): Observable<Home> {
        return this.http.get<Home>(`${this.url}BuscarHome/${idHome}`);
      }
}