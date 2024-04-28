import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { DatosCompartidosService } from '../DatosCompartidosService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmarreserva',
  standalone: true,
  templateUrl: './confirmarreserva.component.html',
  styleUrl: './confirmarreserva.component.css',
  imports: [SidebarComponent]
})
export class ConfirmarreservaComponent implements OnInit {
  datosReserve: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: 0 };
  datosCliente: { idCliente: string, nombre: string, apellidos: string, email: string } = { idCliente: '', nombre: '', apellidos: '', email: '' };

  habitacionId: any;

  numeroReservacion: string = 'null';


  constructor(private datosCompartidosService: DatosCompartidosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datosReserve = this.datosCompartidosService.getDatosReserve();
    this.datosCliente = this.datosCompartidosService.getDatosCliente();


    // this.route.queryParams.subscribe(params => {
    //   this.habitacionId = params['habitacionId']; // Obtener el ID de la habitación
    //   console.log('Habitación ID en confirm:', this.habitacionId);

    // });

  }
}
