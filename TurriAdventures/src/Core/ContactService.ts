import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { About } from '../Model/About'; 

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private url: string = ""

  constructor(private http:HttpClient) {
    this.url =
     "https:///localhost:7032/api/Contacto/";
 
  }

  ListarContactos():Observable<About[]>{
    return this.http.get<About[]>(this.url+"ListarContactos");
  }

}