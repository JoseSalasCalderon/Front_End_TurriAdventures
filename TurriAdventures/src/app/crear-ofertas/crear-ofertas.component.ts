import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oferta } from '../../Model/Oferta';
import { OfertaService } from '../../Core/OfertaService';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-crear-ofertas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-ofertas.component.html',
  styleUrl: './crear-ofertas.component.css'
})
export class CrearOfertasComponent {

  formularioEstado: FormGroup;
  listaEstados: Oferta[] = [];

  constructor(
    private ofertaService: OfertaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formularioEstado = this.fb.group({
      descripcionOferta: ["", Validators.required],
      fechaInicioOferta: [null],
      fechaFinalOferta: [null],
      precioOferta: [0]
    });
  }

  registrarOferta() {
    const Oferta = this.formularioEstado.value;

    // Formatear fechas a YYYY-MM-DD
    Oferta.fechaInicioOferta = this.formatDate(Oferta.fechaInicioOferta);
    Oferta.fechaFinalOferta = this.formatDate(Oferta.fechaFinalOferta);

    this.ofertaService.CrearOfertas(Oferta).subscribe({
      next: (data) => {
        console.log(data);
        this.listaEstados.push(data);
        this.formularioEstado.reset(); 
        // Navegación después de guardar exitosamente
        this.router.navigate(['/listar_estado']);
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
