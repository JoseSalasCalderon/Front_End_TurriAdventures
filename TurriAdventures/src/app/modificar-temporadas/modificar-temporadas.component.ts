import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Temporada } from '../../Model/Temporada';
import { TemporadaService } from '../../Core/TemporadaService';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modificar-temporadas',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './modificar-temporadas.component.html',
  styleUrl: './modificar-temporadas.component.css'
})
export class ModificarTemporadasComponent {
  temporadaForm: FormGroup;
  temporada: Temporada | undefined;
  id:number=0

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private temporadaService: TemporadaService,
    private router: Router
  ) {
    this.temporadaForm = this.fb.group({
      idTemporada: [this.id, Validators.required],
      descripcionTemporada: ['', Validators.required],
      fechaInicioTemporada: ['', Validators.required],
      fechaFinalTemporada: ['', Validators.required],
      precioTemporada: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString) {
        this.id = parseInt(idString); // Usando parseInt()
        // O usando el operador +
        // this.id = +idString;
  
        console.log(this.id); // Esto imprimirá el ID como un número entero
        this.obtenerTemporada(idString);
      }
    });
  }

  obtenerTemporada(id: string): void {
    this.temporadaService.ObtenerTemporada(id).subscribe(
      (data: Temporada) => {
        this.temporada = data;
        this.cargarFormulario();
      },
      error => {
        console.error('Error al obtener la temporada', error);
      }
    );
  }

  cargarFormulario(): void {
    if (this.temporada) {
      // Convierte las fechas a objetos Date si son cadenas
      const fechaInicio = new Date(this.temporada.fechaInicioTemporada);
      const fechaFinal = new Date(this.temporada.fechaFinalTemporada);

      this.temporadaForm.patchValue({
        idTemporada: this.temporada.idTemporada,
        descripcionTemporada: this.temporada.descripcionTemporada,
        fechaInicioTemporada: this.formatearFecha(fechaInicio),
        fechaFinalTemporada: this.formatearFecha(fechaFinal),
        precioTemporada: this.temporada.precioTemporada
      });
    }
  }

  formatearFecha(fecha: Date): string {
    if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
      return '';
    }
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  

  onSubmit(): void {
    if (this.temporadaForm.valid && this.temporada) {
      const formValues = this.temporadaForm.value;
      const updatedTemporada: Temporada = {
        ...this.temporada,
        idTemporada: this.id,
        descripcionTemporada: formValues.descripcionTemporada,
        fechaInicioTemporada: formValues.fechaInicioTemporada,
        fechaFinalTemporada: formValues.fechaFinalTemporada,
        precioTemporada: formValues.precioTemporada
      };

      this.temporadaService.modificarTemporada(updatedTemporada).subscribe(
        response => {
          console.log('Temporada actualizada', response);
          console.log('Temporada actualizada', this.id);
          this.router.navigate(['/listar-temporadas']);
        },
        error => {
          console.error('Error al actualizar la temporada', error);
        }
      );
    }
  }
}
