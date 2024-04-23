import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Contact } from '../Model/Contact'; 

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url: string = ""

  constructor(private http:HttpClient) {
    this.url =
     "https:///localhost:7032/api/Contacto/";
 
  }

  ListarContactos():Observable<Contact[]>{
    return this.http.get<Contact[]>(this.url+"ListarContactos");
  }

}