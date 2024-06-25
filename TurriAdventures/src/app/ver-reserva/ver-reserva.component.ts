import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../Core/ReservaService';
import { HabitacionService } from '../../Core/HabitacionService';
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { ClienteService } from '../../Core/ClienteService';
import { Reserva } from '../../Model/Reserva';
import { Habitacion } from '../../Model/Habitacion';
import { TipoHabitacion } from '../../Model/TipoHabitacion';
import { Cliente } from '../../Model/Cliente';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';

@Component({
  selector: 'app-ver-reserva',
  templateUrl: './ver-reserva.component.html',
  styleUrls: ['./ver-reserva.component.css'],
  imports: [SidebarAdministradorComponent],
  standalone: true,
})
export class VerReservaComponent implements OnInit {

  reserva: Reserva | null = null;
  habitacion: Habitacion | null = null;
  tipoHabitacion: TipoHabitacion | null = null;
  cliente: Cliente | null = null;
  fechaActual: Date = new Date();
  //Con el padStart se asegura que sean siempre dos dígitos, y si es un se ponde un 0 al principio
  fechaFormateada = `
    ${String(this.fechaActual.getDate()).padStart(2, '0')}/
    ${String(this.fechaActual.getMonth() + 1).padStart(2, '0')}/
    ${this.fechaActual.getFullYear().toString()}
  `;

  constructor(
    private route: ActivatedRoute,
    private ReservaService: ReservationService,
    private HabitacionService: HabitacionService,
    private TiposHabitacionService: TipoHabitacionService,
    private ClienteService: ClienteService
  ) {}

  ngOnInit(): void {
    const idReservacion = Number(this.route.snapshot.paramMap.get('id'));
    this.ReservaService.BuscarReservaPorId(idReservacion).subscribe((reserva: Reserva) => {
      this.reserva = reserva;
      this.HabitacionService.BuscarHabitacionPorIdReserva(reserva.idReservacion).subscribe((habitacion: Habitacion) => {
        this.habitacion = habitacion;
        this.TiposHabitacionService.BuscarTipoHabitacionPorIdHabitacion(habitacion.idHabitacion).subscribe((tipoHabitacion: TipoHabitacion) => {
          this.tipoHabitacion = tipoHabitacion;
        });
      });
      this.ClienteService.BuscarClientePorIdReserva(reserva.idReservacion).subscribe((cliente: Cliente) => {
        this.cliente = cliente;
      });
    });
  }

  imprimir() {
    const printWindow = window.open('_blank', '', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`${this.formatoInforme()}`);
      printWindow.document.close();

      // Cerrar la ventana después de imprimir
      printWindow.onafterprint = () => {
        printWindow.close();
      };

      printWindow.print();
    }
  }

  formatoInforme(): string {
    return `
      <style>
        /* Estilos CSS para el formato del informe */
        .container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .titulo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .fecha {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .table th, .table td {
          padding: 8px;
          border: 1px solid #ddd;
        }
      </style>
      <div class="container">
        <h1 class="titulo">Detalles de la Reserva</h1>
        <p class="fecha">Fecha: ${this.fechaFormateada}</p>
        <table class="table">
          <tbody>
            <tr>
              <td><strong>ID Reserva:</strong></td>
              <td>${this.reserva?.idReservacion}</td>
            </tr>
            <tr>
              <td><strong>Nombre:</strong></td>
              <td>${this.cliente?.nombre}</td>
            </tr>
            <tr>
              <td><strong>Apellidos:</strong></td>
              <td>${this.cliente?.apellidos}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${this.cliente?.email}</td>
            </tr>
            <tr>
              <td><strong>Fecha Llegada:</strong></td>
              <td>${this.reserva?.fechaLlegada}</td>
            </tr>
            <tr>
              <td><strong>Fecha Salida:</strong></td>
              <td>${this.reserva?.fechaSalida}</td>
            </tr>
            <tr>
              <td><strong>Tipo de Habitación:</strong></td>
              <td>${this.tipoHabitacion?.nombreTipoHabitacion}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}
