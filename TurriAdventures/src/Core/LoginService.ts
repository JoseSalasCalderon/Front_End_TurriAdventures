import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Login } from '../Model/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7068/api/Administradors/login?";
  }

  verificarCredenciales(usuario: string, contrasena: string): Observable<number> {
    return this.http.post<number>("https://localhost:7068/api/Administradors/login?Usuario="+usuario+"&"+"Contrasena="+contrasena,{ usuario, contrasena });
  }

}