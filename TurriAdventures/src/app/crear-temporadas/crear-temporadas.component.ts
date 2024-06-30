import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Temporada } from '../../Model/Temporada';
import { TemporadaService } from '../../Core/TemporadaService';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-crear-temporadas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-temporadas.component.html',
  styleUrl: './crear-temporadas.component.css'
})
export class CrearTemporadasComponent {


  formularioEstado: FormGroup;
  listaEstados: Temporada[] = [];

  constructor(
    private temporadaService: TemporadaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formularioEstado = this.fb.group({
      descripcionTemporada: ["", Validators.required],
      fechaInicioTemporada: [null],
      fechaFinalTemporada: [null],
      precioTemporada: [0]
    });
  }

  registrarTemporada() {
    const temporada = this.formularioEstado.value;

    // Formatear fechas a YYYY-MM-DD
    temporada.fechaInicioTemporada = this.formatDate(temporada.fechaInicioTemporada);
    temporada.fechaFinalTemporada = this.formatDate(temporada.fechaFinalTemporada);

    this.temporadaService.CrearTemporadas(temporada).subscribe({
      next: (data) => {
        console.log(data);
        this.listaEstados.push(data);
        this.formularioEstado.reset(); 
        // Navegación después de guardar exitosamente
        this.router.navigate(['/listar-temporadas']);
      },
      error: (e) => {
        // Manejo de errores
      }
    });
  }

  // Función para formatear la fecha a 'YYYY-MM-DD'
  private formatDate(date: Date | string): string {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      // Si no es una instancia de Date, devolver la fecha original
      return date as string;
    }
  }
}
