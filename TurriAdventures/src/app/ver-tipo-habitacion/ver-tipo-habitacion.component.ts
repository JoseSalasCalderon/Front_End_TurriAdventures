import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ViewEncapsulation } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../Model/TipoHabitacion';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-tipo-habitacion',
  standalone: true,
  templateUrl: './ver-tipo-habitacion.component.html',
  styleUrl: './ver-tipo-habitacion.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, HeaderComponent, SidebarAdministradorComponent]
})
export class VerTipoHabitacionComponent implements OnInit{
  
  tipoHabitacionSeleccionada: TipoHabitacion | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private tiposHabitacionService: TipoHabitacionService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.buscarTipoHabitacion();
  }

  buscarTipoHabitacion() {
    const tipoHabitacionSeleccionada = sessionStorage.getItem('TipoHabitacionSeleccionada');
    if (tipoHabitacionSeleccionada) {
      const tipoHabitacionInt = parseInt(tipoHabitacionSeleccionada);
      this.tiposHabitacionService.BuscarTipoHabitacionPorId(tipoHabitacionInt).subscribe((tipoHabitacion: TipoHabitacion) => {
        this.tipoHabitacionSeleccionada = tipoHabitacion;
        this.imageSrc = `assets/Habitaciones/${tipoHabitacion.idTipoHabitacion}.jpg`;
      });
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
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('https://localhost:7032/api/FileUpload/upload', formData).subscribe((response: any) => {
        console.log('File uploaded successfully', response);
        alert('File uploaded successfully');
      }, (error: any) => {
        console.error('File upload failed', error);
        alert('File upload failed');
      });
    }
  }

  volverAdministrarHabitaciones() {
    this.router.navigate(['/administrarHabitaciones']);
  }

}
