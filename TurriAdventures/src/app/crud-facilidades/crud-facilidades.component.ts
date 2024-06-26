import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Facilidad } from '../../Model/Facilidad';
import { FacilidadService } from '../../Core/FacilidadService';
import { UploadImagesServiceService } from '../../Core/upload-images-service.service';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';

@Component({
  selector: 'app-crud-facilidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, SidebarAdministradorComponent],
  templateUrl: './crud-facilidades.component.html',
  styleUrl: './crud-facilidades.component.css'
})
export class CrudFacilidadesComponent implements OnInit {
  facilidades: Facilidad[] = [];
  facilidadForm: FormGroup;
  modalTitle: string = '';
  selectedFacilidad: Facilidad | null = null;
  imagenFacilidad: File | string | ArrayBuffer | null = null;
  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private facilidadService: FacilidadService,
    private uploadImagesService: UploadImagesServiceService
  ) {
    this.facilidadForm = this.fb.group({
      descripcionFacilidad: ['', Validators.required],
      imagenFacilidad: [null]
    });
  }

  ngOnInit(): void {
    this.obtenerFacilidades();
  }

  obtenerFacilidades(): void {
    this.facilidadService.ListarFacilidades().subscribe((data: Facilidad[]) => {
      this.facilidades = data;
    });
  }

  openModal(mode: string, facilidad?: Facilidad): void {

    this.modalTitle = mode === 'create' ? 'Agregar Facilidad' : 'Editar Facilidad';
    if (mode === 'edit' && facilidad) {
      this.selectedFacilidad = facilidad;
      this.facilidadForm.patchValue(facilidad);
      // this.imagenFacilidad = this.selectedFacilidad.imagenFacilidad;
      this.imagenFacilidad = String(facilidad.imagenFacilidad); // Asegura que sea un string
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
    this.obtenerFacilidades;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      // this.imagenFacilidad = input.files[0];
      const file = input.files[0];

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagenFacilidad = e.target.result;
      };

      // reader.readAsDataURL(input.files[0]);
      reader.readAsDataURL(file);

      this.facilidadForm.patchValue({
        // imagenFacilidad: input.files[0]
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
            ...this.facilidadForm.value
          };
          this.facilidadService.EditarFacilidad(updatedFacilidad).subscribe(() => {
            this.obtenerFacilidades();
            this.mostrarMensaje('Facilidad actualizada.', false);

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
            this.obtenerFacilidades();
            this.closeModal();
            this.mostrarMensaje('Facilidad creada.', false);

          });
        });
      }
    }
    this.obtenerFacilidades();

  }

  deleteFacilidad(id: number): void {
    this.facilidadService.EliminarFacilidad(id).subscribe(() => {
      this.mostrarMensaje('Facilidad eliminada.', false);
      this.obtenerFacilidades();
    });

  }

  mostrarMensaje(mensaje: string, esError: boolean) {
    this.mensaje = mensaje;
    this.esError = esError;
    this.obtenerFacilidades();
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
    this.obtenerFacilidades();
  }
}
