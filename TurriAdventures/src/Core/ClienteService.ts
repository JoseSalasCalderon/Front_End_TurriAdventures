import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Cliente } from '../Model/Cliente'; 

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = ""

  constructor(private http:HttpClient) {
    this.url = "https://localhost:7032/Clientes/";
  }

  ListarCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url+"ListarClientes");
  }

  BuscarCliente(idCliente: String):Observable<Cliente>{
    return this.http.get<Cliente>(this.url+"BuscarCliente/"+idCliente);
  }

  BuscarClientePorIdReserva(idCliente: number):Observable<Cliente>{
    return this.http.get<Cliente>(this.url+"BuscarClientePorIdReservacion/"+idCliente);
  }

  CrearCliente(cliente: Cliente): Observable<any> {
    console.log('CrearCliente en service', cliente);      
    return this.http.post(this.url +"CrearCliente/", cliente);
}//CrearCliente

}