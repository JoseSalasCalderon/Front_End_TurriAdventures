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



  buscarUsuario(data: any): Observable<Login> {
    console.log(data);
    return this.http.post<Login>("https://localhost:7068/api/Administradors/VerificarCredencialesAdministrador?usuario="+data.usuario+"&"+"contrasena="+data.contrasena,data);
  }

  isAuthenticated(): boolean {
    const id = sessionStorage.getItem('id');
    return !!id;
  }

  public logout(): void {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('usuario');
  }


}

