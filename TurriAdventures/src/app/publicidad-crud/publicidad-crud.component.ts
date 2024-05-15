import { Component, OnInit } from '@angular/core';
import { SidebarAdministradorComponent } from "../sidebar-administrador/sidebar-administrador.component";
import { Publicidad } from '../../Model/Publicidad';
import { PublicidadService } from '../../Core/PublicidadService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publicidad-crud',
  standalone: true,
  templateUrl: './publicidad-crud.component.html',
  styleUrl: './publicidad-crud.component.css',
  imports: [SidebarAdministradorComponent, CommonModule]
})
export class PublicidadCRUDComponent implements OnInit {

  publicidades: Publicidad[] = [];
  imagenActual: string = '';
  imagenOriginal: string = '';
  
  constructor(private publicidadService: PublicidadService) { }

  ngOnInit(): void {
    this.obtenerPublicidades();
  }

  obtenerPublicidades() {
    this.publicidadService.ListarPublicidades().subscribe(
      (data: Publicidad[]) => {
        this.publicidades = data;
        if (this.publicidades.length > 0) {
          this.imagenActual = this.publicidades[0].imagenPublicidad; // Tomar la primera imagen
          this.imagenOriginal = this.imagenActual; 
          
        }
      },
      error => {
        console.error('Error al obtener las publicidades', error);
      }
    );
  }

  aceptarCambios() {//implementar
    console.log('Cambios aceptados');
  }

  cancelarCambios() {//implementar
    this.imagenActual = this.imagenOriginal;
    console.log('Cambios cancelados');
  }

  onChangeImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imagenActualElement = document.getElementById('imagenActual');
        if (imagenActualElement) {
          // Actualiza la imagen actual con la imagen seleccionada
          imagenActualElement.setAttribute('src', e.target.result);
        } else {
          console.error('No se encontró el elemento con id "imagenActual".');
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}