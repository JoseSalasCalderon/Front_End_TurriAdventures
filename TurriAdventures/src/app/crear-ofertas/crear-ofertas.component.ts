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
  styleUrls: ['./crear-ofertas.component.css']
})
export class CrearOfertasComponent {

  formularioEstado: FormGroup;
  listaEstados: Oferta[] = [];
  submitted = false;
  successMessage = '';

  constructor(
    private ofertaService: OfertaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formularioEstado = this.fb.group({
      descripcionOferta: ["", Validators.required],
      fechaInicioOferta: [null, Validators.required],
      fechaFinalOferta: [null, Validators.required],
      precioOferta: [0, Validators.required]
    });
  }

  registrarOferta() {
    this.submitted = true;

    if (this.formularioEstado.invalid) {
      return;
    }

    const oferta = this.formularioEstado.value;

    // Formatear fechas a YYYY-MM-DD
    oferta.fechaInicioOferta = this.formatDate(oferta.fechaInicioOferta);
    oferta.fechaFinalOferta = this.formatDate(oferta.fechaFinalOferta);

    this.ofertaService.CrearOfertas(oferta).subscribe({
      next: (data) => {
        console.log(data);
        this.listaEstados.push(data);
        this.formularioEstado.reset(); 
        this.submitted = false;
        // Mostrar mensaje de éxito
        this.successMessage = 'La oferta se ha creado correctamente.';
        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/listar-ofertas']);
        }, 2000);
      },
      error: (e) => {
        // Manejo de errores
        console.error(e);
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