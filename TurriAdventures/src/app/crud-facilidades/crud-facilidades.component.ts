import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Facilidad } from '../../Model/Facilidad';
import { FacilidadService } from '../../Core/FacilidadService';
import { UploadImagesServiceService } from '../../Core/upload-images-service.service';

@Component({
  selector: 'app-crud-facilidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './crud-facilidades.component.html',
  styleUrl: './crud-facilidades.component.css'
})
export class CrudFacilidadesComponent implements OnInit {
  facilidades: Facilidad[] = [];
  facilidadForm: FormGroup;
  modalTitle: string = '';
  selectedFacilidad: Facilidad | null = null;

  constructor(
    private fb: FormBuilder,
    private facilidadService: FacilidadService,
    private uploadImagesService: UploadImagesServiceService  ) {
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
    } else {
      this.selectedFacilidad = null;
      this.facilidadForm.reset();
    }

    // Abre el modal utilizando JavaScript vanilla
    const modalElement = document.getElementById('facilidadModal');
    if (modalElement) {
      modalElement.classList.add('show'); // Muestra el modal
      modalElement.style.display = 'block';
    }
  }

  closeModal(): void {
    // Cierra el modal utilizando JavaScript vanilla
    const modalElement = document.getElementById('facilidadModal');
    if (modalElement) {
      modalElement.classList.remove('show'); // Oculta el modal
      modalElement.style.display = 'none';
    }
    this.facilidadForm.reset();
    this.selectedFacilidad = null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.facilidadForm.patchValue({
        imagenFacilidad: input.files[0]
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
          });
        });
      }
    }
    this.obtenerFacilidades();

  }

  deleteFacilidad(id: number): void {
    this.facilidadService.EliminarFacilidad(id).subscribe(() => {
      this.obtenerFacilidades();
    });
  }
}
