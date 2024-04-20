import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { ReservationService } from '../../Core/reservation.service';
import { Reserva } from '../../Models/Reserva';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [SidebarComponent,FormsModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent implements OnInit{

  listaEstados:Reserva[]=[];

  constructor(private ReservationService:ReservationService,private router: Router) { }


  obtenerEstados() {
    return this.ReservationService.getList().subscribe((data: Reserva[]) => {
      console.log(data);
      this.listaEstados = data;
    })
  };

  ngOnInit(): void {
    console.log(this.obtenerEstados())
  }

  mostrarAlerta(): void {
    alert('La reserva ha sido guardada exitosamente');

    // Limpiar los valores de los campos
    (document.getElementById('fechaEntrada') as HTMLInputElement).value = '';
    (document.getElementById('fechaSalida') as HTMLInputElement).value = '';
    (document.getElementById('estadoReservacion') as HTMLInputElement).value = '';
    (document.getElementById('numeroHabitacion') as HTMLInputElement).value = '';
    (document.getElementById('idCliente') as HTMLInputElement).value = '';
    (document.getElementById('tarjeta') as HTMLInputElement).value = '';
    (document.getElementById('seguridad') as HTMLInputElement).value = '';
}



}
