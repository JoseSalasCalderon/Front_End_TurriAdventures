import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Facilidad } from '../../Model/Facilidad';
import { FacilidadService } from '../../Core/FacilidadService';
import { UploadImagesServiceService } from '../../Core/upload-images-service.service';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';

@Component({
  selector: 'app-crud-facilidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarAdministradorComponent],
  templateUrl: './crud-facilidades.component.html',
  styleUrl: './crud-facilidades.component.css'
})
export class CrudFacilidadesComponent implements OnInit {
  facilidades: Facilidad[] = [];
  facilidadForm: FormGroup;
  modalTitle: string = '';
  selectedFacilidad: Facilidad | null = null;
  imagenFacilidad: string | ArrayBuffer | null = null;
  mensaje: string = '';
  esError: boolean = false;

  facilidadesPorPagina: number = 4;
  paginaActual: number = 1;
  totalPaginas: number = 0;

  constructor(
    private fb: FormBuilder,
    private facilidadService: FacilidadService,
    private uploadImagesService: UploadImagesServiceService
  ) {
    this.facilidadForm = this.fb.group({
      descripcionFacilidad: ['', [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      imagenFacilidad: [null]
    });
  }

  ngOnInit(): void {
    this.obtenerFacilidades();
  }

  obtenerFacilidades(): void {
    this.facilidadService.ListarFacilidades().subscribe((data: Facilidad[]) => {
      this.facilidades = data;
      this.totalPaginas = Math.ceil(this.facilidades.length / this.facilidadesPorPagina);
      this.paginaActual = 1; // Reset to first page when data is loaded
    });
  }

  get facilidadesPaginadas() {
    const inicio = (this.paginaActual - 1) * this.facilidadesPorPagina;
    const fin = inicio + this.facilidadesPorPagina;
    return this.facilidades.slice(inicio, fin);
  }

  openModal(mode: string, facilidad?: Facilidad): void {
    this.modalTitle = mode === 'create' ? 'Agregar Facilidad' : 'Editar Facilidad';
    if (mode === 'edit' && facilidad) {
      this.selectedFacilidad = facilidad;
      this.facilidadForm.patchValue(facilidad);
      this.imagenFacilidad = facilidad.imagenFacilidad;
    } else {
      this.selectedFacilidad = null;
      this.facilidadForm.reset();
      this.imagenFacilidad = null;
    }

    const modalElement = document.getElementById('facilidadModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
    }
    this.obtenerFacilidades();

  }

  closeModal(): void {
    const modalElement = document.getElementById('facilidadModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
    this.facilidadForm.reset();
    this.selectedFacilidad = null;
    this.imagenFacilidad = null;
    this.obtenerFacilidades();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenFacilidad = e.target.result;
      };
      reader.readAsDataURL(file);
      this.facilidadForm.patchValue({
        imagenFacilidad: file
      });
    }
  }

  onSubmit(): void {
    if (this.facilidadForm.valid) {
      if (this.selectedFacilidad) {
        this.uploadImagesService.subirImagen(this.facilidadForm.get('imagenFacilidad')!.value).subscribe(response => {
          this.facilidadForm.patchValue({ imagenFacilidad: response.secure_url });
          const updatedFacilidad: Facilidad = {
            ...this.selectedFacilidad,
            ...this.facilidadForm.value,
            imagenFacilidad: response.secure_url
          };
          this.facilidadService.EditarFacilidad(updatedFacilidad).subscribe(() => {
            this.mostrarMensaje('Facilidad editada exitosamente.', false);
            this.obtenerFacilidades();
            this.closeModal();
          });
        });
      } else {
        this.uploadImagesService.subirImagen(this.facilidadForm.get('imagenFacilidad')!.value).subscribe(response => {
          const newFacilidad: Facilidad = {
            ...this.facilidadForm.value,
            imagenFacilidad: response.secure_url
          };
          this.facilidadService.CrearFacilidad(newFacilidad).subscribe(() => {
            this.mostrarMensaje('Facilidad creada exitosamente.', false);
            this.obtenerFacilidades();
            this.closeModal();
          });
        });
      }
    } else {
      this.mostrarMensaje('Descripción inválida o vacía. Por favor, ingrese una descripción válida.', true);
    }
    this.obtenerFacilidades();

  }

  deleteFacilidad(id: number): void {
    if (window.confirm('¿Está seguro que desea eliminar la facilidad?')) {
      this.facilidadService.EliminarFacilidad(id).subscribe(() => {
        this.mostrarMensaje('Facilidad eliminada exitosamente.', false);
        this.obtenerFacilidades();
      });
    }
  }

  mostrarMensaje(mensaje: string, esError: boolean): void {
    this.mensaje = mensaje;
    this.esError = esError;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
  }
}
