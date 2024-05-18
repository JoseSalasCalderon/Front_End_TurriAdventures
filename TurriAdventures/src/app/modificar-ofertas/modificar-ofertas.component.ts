import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oferta } from '../../Model/Oferta';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaService } from '../../Core/OfertaService';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';



@Component({
  selector: 'app-modificar-ofertas',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './modificar-ofertas.component.html',
  styleUrl: './modificar-ofertas.component.css'
})
export class ModificarOfertasComponent {
  OfertaForm: FormGroup;
  Oferta: Oferta | undefined;
  id:number=0

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private OfertaService: OfertaService,
    private router: Router
  ) {
    this.OfertaForm = this.fb.group({
      idOferta: [this.id, Validators.required],
      descripcionOferta: ['', Validators.required],
      fechaInicioOferta: ['', Validators.required],
      fechaFinalOferta: ['', Validators.required],
      precioOferta: ['', Validators.required]
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
        this.obtenerOferta(idString);
      }
    });
  }

  obtenerOferta(id: string): void {
    this.OfertaService.ObtenerOferta(id).subscribe(
      (data: Oferta) => {
        this.Oferta = data;
        this.cargarFormulario();
      },
      error => {
        console.error('Error al obtener la Oferta', error);
      }
    );
  }

  cargarFormulario(): void {
    if (this.Oferta) {
      console.log('Datos de la oferta:', this.Oferta); // Añadir esta línea para depuración
      const fechaInicio = new Date(this.Oferta.fechaInicioOferta);
      const fechaFinal = new Date(this.Oferta.fechaFinalOferta);
  
      this.OfertaForm.patchValue({
        idOferta: this.Oferta.idOferta,
        descripcionOferta: this.Oferta.descripcionOferta,
        fechaInicioOferta: this.formatearFecha(fechaInicio),
        fechaFinalOferta: this.formatearFecha(fechaFinal),
        precioOferta: this.Oferta.precioOferta
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
    if (this.OfertaForm.valid && this.Oferta) {
      const formValues = this.OfertaForm.value;
      const updatedOferta: Oferta = {
        ...this.Oferta,
        idOferta: this.id,
        descripcionOferta: formValues.descripcionOferta,
        fechaInicioOferta: new Date(formValues.fechaInicioOferta), // Mantener como Date
        fechaFinalOferta: new Date(formValues.fechaFinalOferta), // Mantener como Date
        precioOferta: formValues.precioOferta
      };
  
      // Crear un objeto separado para enviar al servidor con las fechas formateadas como cadenas
      const updatedOfertaForServer = {
        ...updatedOferta,
        fechaInicioOferta: this.formatearFecha(updatedOferta.fechaInicioOferta),
        fechaFinalOferta: this.formatearFecha(updatedOferta.fechaFinalOferta)
      };
  
      this.OfertaService.modificarOferta(updatedOfertaForServer).subscribe(
        response => {
          console.log('Oferta actualizada', response);
          this.router.navigate(['/listar-Ofertas']);
        },
        error => {
          console.error('Error al actualizar la Oferta', error);
        }
      );
    }
  }
  
}
