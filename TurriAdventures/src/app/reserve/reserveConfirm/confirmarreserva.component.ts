import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { DatosCompartidosService } from '../DatosCompartidosService';
import { ActivatedRoute } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

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

  constructor(private datosCompartidosService: DatosCompartidosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datosReserve = this.datosCompartidosService.getDatosReserve();
    this.datosCliente = this.datosCompartidosService.getDatosCliente();
    this.enviarCorreo();
  }

  enviarCorreo() {
    const templateParams = {
      nombre: this.datosCliente.nombre,
      apellidos: this.datosCliente.apellidos,
      email: this.datosCliente.email,
      fechaLlegada: this.datosReserve.fechaLlegada,
      fechaSalida: this.datosReserve.fechaSalida,
      idCliente: this.datosCliente.idCliente
    };

    emailjs.send('service_xpb0hjs', 'template_1y2o4cu', templateParams, 'lnkmeUkx_FGf2yVZ1')
      .then((result: EmailJSResponseStatus) => {
        console.log('Email sent successfully!', result.status, result.text);
      },
      );
  }

}