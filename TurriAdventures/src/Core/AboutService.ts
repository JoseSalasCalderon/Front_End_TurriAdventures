// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http'
// import { Observable } from 'rxjs';
// import { About } from '../Model/About';

// @Injectable({
//   providedIn: 'root'
// })
// export class AboutService {

//   private url: string = ""

//   constructor(private http: HttpClient) {
//     this.url =
//       "https://localhost:7032/api/Nosotros/";

//   }

//   ListarNosotros(): Observable<About[]> {
//     return this.http.get<About[]>(this.url + "ListarNosotros");
//   }

//   BuscarNosotrosPorId(about: number): Observable<About> {
//     return this.http.get<About>(this.url + "BuscarNosotros/" + about);
//   }

//   CrearNosotros(about: About): Observable<any> {
//     return this.http.post(this.url + 'CrearNosotros', about);
//   }

//   EditarNosotros(about: About): Observable<any> {
//     return this.http.put(`${this.url}EditarNosotros`, about);
//   }


//   EliminarNosotros(id: number): Observable<any> {
//     return this.http.delete(`${this.url}EliminarNosotros/${id}`);
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { About } from '../Model/About';
import { Habitacion } from '../Model/Habitacion';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private url: string = 'https://localhost:7032/api/Nosotros/';

  constructor(private http: HttpClient) { }

  ListarNosotros(): Observable<About[]> {
    console.log('ListarNosotros service', this.http.get<About[]>(this.url + 'ListarNosotros'));
    return this.http.get<About[]>(this.url + 'ListarNosotros');
  }

  BuscarNosotrosPorId(id: number): Observable<About> {
    return this.http.get<About>(this.url + 'BuscarNosotros/' + id);
  }

  CrearNosotros(about: About): Observable<any> {
    return this.http.post(this.url + 'CrearNosotros', about);
  }

  EditarNosotros(about: About): Observable<any> {
    return this.http.put(this.url + 'EditarNosotros', about);
  }

  EliminarNosotros(id: number): Observable<any> {
    return this.http.delete(`${this.url}EliminarNosotros/${id}`);
  }
}
