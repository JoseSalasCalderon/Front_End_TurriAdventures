import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ViewEncapsulation } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../Model/TipoHabitacion';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UploadImagesServiceService } from '../../Core/upload-images-service.service';

@Component({
  selector: 'app-ver-tipo-habitacion',
  standalone: true,
  templateUrl: './ver-tipo-habitacion.component.html',
  styleUrl: './ver-tipo-habitacion.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, HeaderComponent, SidebarAdministradorComponent, FormsModule]
})
export class VerTipoHabitacionComponent implements OnInit{
  
  tipoHabitacionSeleccionada: TipoHabitacion | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  generalErrorMessage: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private tiposHabitacionService: TipoHabitacionService,
    private router: Router,
    private http: HttpClient,
    private UploadImagesServiceService: UploadImagesServiceService
  ) { }

  ngOnInit(): void {
    this.buscarTipoHabitacion();
  }

  buscarTipoHabitacion() {
    const tipoHabitacionSeleccionada = sessionStorage.getItem('TipoHabitacionSeleccionada');
    if (tipoHabitacionSeleccionada) {
      const tipoHabitacionInt = parseInt(tipoHabitacionSeleccionada);
      this.tiposHabitacionService.BuscarTipoHabitacionPorId(tipoHabitacionInt).subscribe({
        next: (tipoHabitacion: TipoHabitacion) => {
          this.tipoHabitacionSeleccionada = tipoHabitacion;
          this.imageSrc = tipoHabitacion.imagenTipoHabitacion;
          
          // Realiza una solicitud HTTP para obtener la imagen como un Blob
          this.http.get(this.imageSrc, { responseType: 'blob' }).subscribe(blob => {
            this.selectedFile = new File([blob], tipoHabitacion.imagenTipoHabitacion, { type: blob.type });
          });
        },
        error: () => {
          this.generalErrorMessage = 'Algo anda mal. Por favor, vuelva más tarde.';
        }
      });
    } else {
      this.generalErrorMessage = 'Algo anda mal. Por favor, vuelva más tarde.';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.previewFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.previewFile(input.files[0]);
    }
  }

  previewFile(file: File) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => this.imageSrc = reader.result;
    reader.readAsDataURL(file);
  }

  aceptar() {
    if (this.selectedFile) {
     
      this.UploadImagesServiceService.subirImagen(this.selectedFile).subscribe((res) => {
        console.log(res);
        if (res) {
          if (this.tipoHabitacionSeleccionada && this.selectedFile) {
            this.tipoHabitacionSeleccionada.imagenTipoHabitacion = res.url;
            this.tiposHabitacionService.ActualizarTipoHabitacion(this.tipoHabitacionSeleccionada).subscribe(response => {
              // Abrir modal si la respuesta es true o false
              if(response=true){
                this.imageSrc = res.url;
                this.successMessage = 'Actualizó correctamente.';
                this.errorMessage = null;
              }else{
                this.successMessage = null;
                this.errorMessage = 'No se pudo actualizar.';
              }
  
            });
          }
        }
      });
      // this.http.post('https://localhost:7032/api/FileUpload/upload', formData).subscribe((response: any) => {
      //   console.log('File uploaded successfully', response);
      //   alert('File uploaded successfully');


        //Se actualiza el tipo de habitacion
        // if (this.tipoHabitacionSeleccionada && this.selectedFile) {
        //   this.tipoHabitacionSeleccionada.imagenTipoHabitacion = this.selectedFile.name;
        //   this.tiposHabitacionService.ActualizarTipoHabitacion(this.tipoHabitacionSeleccionada).subscribe(response => {
        //     // Abrir modal si la respuesta es true o false
        //     if(response=true){
        //       this.successMessage = 'Actualizó correctamente.';
        //       this.errorMessage = null;
        //     }else{
        //       this.successMessage = null;
        //       this.errorMessage = 'No se pudo actualizar.';
        //     }

        //   });
        // }
        
      // }, (error: any) => {
      //   this.successMessage = null;
      //   this.errorMessage = 'No se subió el archivo.';
      // });
    }
  }


  volverAdministrarHabitaciones() {
    this.router.navigate(['/administrarHabitaciones']);
  }

}
