// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { HeaderComponent } from "../header/header.component";
// import { ViewEncapsulation } from '@angular/core';
// import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
// import { TipoHabitacion } from '../../Model/TipoHabitacion';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { UploadImagesServiceService } from '../../Core/upload-images-service.service';

// @Component({
//   selector: 'app-ver-tipo-habitacion',
//   standalone: true,
//   templateUrl: './ver-tipo-habitacion.component.html',
//   styleUrl: './ver-tipo-habitacion.component.css',
//   encapsulation: ViewEncapsulation.None,
//   imports: [CommonModule, HeaderComponent, SidebarAdministradorComponent, FormsModule]
// })
// export class VerTipoHabitacionComponent implements OnInit{
  
//   tipoHabitacionSeleccionada: TipoHabitacion | null = null;
//   imageSrc: string | ArrayBuffer | null = null;
//   selectedFile: File | null = null;
//   successMessage: string | null = null;
//   errorMessage: string | null = null;
//   @ViewChild('fileInput') fileInput!: ElementRef;

//   constructor(
//     private tiposHabitacionService: TipoHabitacionService,
//     private router: Router,
//     private http: HttpClient,
//     private UploadImagesServiceService: UploadImagesServiceService
//   ) { }

//   ngOnInit(): void {
//     this.buscarTipoHabitacion();
//   }

//   buscarTipoHabitacion() {
//     const tipoHabitacionSeleccionada = sessionStorage.getItem('TipoHabitacionSeleccionada');
//     if (tipoHabitacionSeleccionada) {
//       const tipoHabitacionInt = parseInt(tipoHabitacionSeleccionada);
//       this.tiposHabitacionService.BuscarTipoHabitacionPorId(tipoHabitacionInt).subscribe((tipoHabitacion: TipoHabitacion) => {
//         this.tipoHabitacionSeleccionada = tipoHabitacion;
//         this.imageSrc = tipoHabitacion.imagenTipoHabitacion;
        
//         // Realiza una solicitud HTTP para obtener la imagen como un Blob
//         this.http.get(this.imageSrc, { responseType: 'blob' }).subscribe(blob => {
//           this.selectedFile = new File([blob], tipoHabitacion.imagenTipoHabitacion, { type: blob.type });
//           console.log(this.selectedFile);
//         });
//       });
//     }
//   }

//   onDragOver(event: DragEvent) {
//     event.preventDefault();
//   }

//   onDragLeave(event: DragEvent) {
//     event.preventDefault();
//   }

//   onDrop(event: DragEvent) {
//     event.preventDefault();
//     const files = event.dataTransfer?.files;
//     if (files && files.length > 0) {
//       this.previewFile(files[0]);
//     }
//   }

//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.previewFile(input.files[0]);
//     }
//   }

//   previewFile(file: File) {
//     this.selectedFile = file;
//     const reader = new FileReader();
//     reader.onload = (e) => this.imageSrc = reader.result;
//     reader.readAsDataURL(file);
//   }

//   aceptar() {
//     if (this.selectedFile) {
     
//       this.UploadImagesServiceService.subirImagen(this.selectedFile).subscribe((res) => {
//         console.log(res);
//         if (res) {
//           if (this.tipoHabitacionSeleccionada && this.selectedFile) {
//             this.tipoHabitacionSeleccionada.imagenTipoHabitacion = res.url;
//             this.tiposHabitacionService.ActualizarTipoHabitacion(this.tipoHabitacionSeleccionada).subscribe(response => {
//               // Abrir modal si la respuesta es true o false
//               if(response=true){
//                 this.imageSrc = res.url;
//                 this.successMessage = 'Actualizó correctamente.';
//                 this.errorMessage = null;
//               }else{
//                 this.successMessage = null;
//                 this.errorMessage = 'No se pudo actualizar.';
//               }
  
//             });
//           }
//         }
//       });
//     }
//   }


//   volverAdministrarHabitaciones() {
//     this.router.navigate(['/administrarHabitaciones']);
//   }

// }
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ViewEncapsulation } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { OfertaService } from '../../Core/OfertaService';
import { TemporadaService } from '../../Core/TemporadaService';
import { TipoHabitacion } from '../../Model/TipoHabitacion';
import { Oferta } from '../../Model/Oferta';
import { Temporada } from '../../Model/Temporada';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UploadImagesServiceService } from '../../Core/upload-images-service.service';

@Component({
  selector: 'app-ver-tipo-habitacion',
  standalone: true,
  templateUrl: './ver-tipo-habitacion.component.html',
  styleUrls: ['./ver-tipo-habitacion.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, HeaderComponent, SidebarAdministradorComponent, FormsModule]
})
export class VerTipoHabitacionComponent implements OnInit {
  tipoHabitacionSeleccionada: TipoHabitacion | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  temporadas: Temporada[] = [];
  ofertas: Oferta[] = [];
  selectedTemporadaId: number = 0;
  selectedOfertaId: number = 0;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private tiposHabitacionService: TipoHabitacionService,
    private ofertaService: OfertaService,
    private temporadaService: TemporadaService,
    private router: Router,
    private http: HttpClient,
    private uploadImagesService: UploadImagesServiceService
  ) {}

  ngOnInit(): void {
    this.buscarTipoHabitacion();
    this.obtenerTemporadas();
    this.obtenerOfertas();
  }

  buscarTipoHabitacion() {
    const tipoHabitacionSeleccionada = sessionStorage.getItem('TipoHabitacionSeleccionada');
    if (tipoHabitacionSeleccionada) {
      const tipoHabitacionInt = parseInt(tipoHabitacionSeleccionada);
      this.tiposHabitacionService.BuscarTipoHabitacionPorId(tipoHabitacionInt).subscribe((tipoHabitacion: TipoHabitacion) => {
        this.tipoHabitacionSeleccionada = tipoHabitacion;
        this.imageSrc = tipoHabitacion.imagenTipoHabitacion;
        this.selectedTemporadaId = tipoHabitacion.idTemporada;
        this.selectedOfertaId = tipoHabitacion.idOferta;

        this.http.get(this.imageSrc, { responseType: 'blob' }).subscribe(blob => {
          this.selectedFile = new File([blob], tipoHabitacion.imagenTipoHabitacion, { type: blob.type });
        });
      });
    }
  }

  obtenerTemporadas() {
    this.temporadaService.ListarTemporadas().subscribe(
      (temporadas: Temporada[]) => {
        this.temporadas = temporadas;
      },
      error => this.errorMessage = 'Error al cargar temporadas'
    );
  }

  obtenerOfertas() {
    this.ofertaService.ListarOfertas().subscribe(
      (ofertas: Oferta[]) => {
        this.ofertas = ofertas;
      },
      error => this.errorMessage = 'Error al cargar ofertas'
    );
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
    if (!this.tipoHabitacionSeleccionada || !this.selectedFile) {
      this.errorMessage = 'Debe seleccionar una imagen.';
      this.successMessage = null;
      return;
    }
  
    // if (!this.tipoHabitacionSeleccionada.nombre || this.tipoHabitacionSeleccionada.nombre.trim().length < 2) {
    //   this.errorMessage = 'Error en los datos ingresados.';
    //   this.successMessage = null;
    //   return;
    // }
  
    // if (!this.tipoHabitacionSeleccionada.descripcion || this.tipoHabitacionSeleccionada.descripcion.trim().length < 2) {
    //   this.errorMessage = 'Error en los datos ingresados.';
    //   this.successMessage = null;
    //   return;
    // }
  
    this.uploadImagesService.subirImagen(this.selectedFile).subscribe((res) => {
      if (res) {
        if (this.tipoHabitacionSeleccionada) {
          this.tipoHabitacionSeleccionada.imagenTipoHabitacion = res.url;
          this.tipoHabitacionSeleccionada.idTemporada = this.selectedTemporadaId;
          this.tipoHabitacionSeleccionada.idOferta = this.selectedOfertaId;
          this.tiposHabitacionService.ActualizarTipoHabitacion(this.tipoHabitacionSeleccionada).subscribe(response => {
            if (response) {
              this.imageSrc = res.url;
              this.successMessage = 'Actualización exitosa.';
              this.errorMessage = null;
            } else {
              this.successMessage = null;
              this.errorMessage = 'No se pudo actualizar.';
            }
          });
        }
      }
    });
  }

  volverAdministrarHabitaciones() {
    this.router.navigate(['/administrarHabitaciones']);
  }
}


