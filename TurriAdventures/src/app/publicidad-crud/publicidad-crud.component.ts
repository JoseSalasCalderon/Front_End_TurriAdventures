import { Component, OnInit } from '@angular/core';
import { SidebarAdministradorComponent } from "../sidebar-administrador/sidebar-administrador.component";
import { Publicidad } from '../../Model/Publicidad';
import { PublicidadService } from '../../Core/PublicidadService';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publicidad-crud',
  standalone: true,
  templateUrl: './publicidad-crud.component.html',
  styleUrl: './publicidad-crud.component.css',
  imports: [CommonModule, SidebarAdministradorComponent]
})
export class PublicidadCRUDComponent implements OnInit {

  publicidades: Publicidad[] = [];
  imagenActual: string = '';
  imagenOriginal: string = '';
  idPublicidad: number = 0;
  nombrePublicidad: string = '';
  imagenSeleccionada: File | null = null;

  constructor(
    private publicidadService: PublicidadService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.obtenerPublicidades();
  }

  obtenerPublicidades() {
    this.publicidadService.ListarPublicidades().subscribe(
      (data: Publicidad[]) => {
        data.sort((a, b) => b.idPublicidad - a.idPublicidad);
        this.publicidades = data;
        if (this.publicidades.length > 0) {
          this.imagenActual = this.publicidades[0].imagenPublicidad;
          this.imagenOriginal = this.imagenActual;
          console.log('Publicidades:', this.publicidades);
        }
      }
    );
  }

  buscarPublicidad() {
    this.publicidadService.BuscarPublicidadPorNombre(this.nombrePublicidad).subscribe(
      (publicidad: Publicidad) => {
        if (publicidad) {
          this.imagenActual = publicidad.imagenPublicidad;
          this.publicidades[0].linkPublicidad = publicidad.linkPublicidad;
          this.publicidades[0].nombrePublicidad = publicidad.nombrePublicidad;
        } else {
          console.log('No se encontró ninguna publicidad con el ID especificado.');
        }
      },
    );
  }


  onChangeIdPublicidad(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.nombrePublicidad = input.value, 10;
    } else {
      this.nombrePublicidad = '';
    }
  }

  aceptarCambios() {//implementar
    console.log('Cambios aceptados');
  }

  onChangeImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagenSeleccionada = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imagenActualElement = document.getElementById('imagenActual');
        if (imagenActualElement) {
          imagenActualElement.setAttribute('src', e.target.result);
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
    console.log('Imagen seleccionada:', this.imagenSeleccionada);
  }

  crearPublicidad() {
    const modal = document.getElementById('crearAnuncioModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.classList.add('modal-backdrop', 'fade', 'show');
      document.body.appendChild(backdrop);
    }
    this.obtenerPublicidades();
  }

  guardarImagen(event: Event) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    if (this.imagenSeleccionada) {
      const nombrePublicidad = (document.getElementById('nuevoNombre') as HTMLInputElement).value;
      const linkDestino = (document.getElementById('nuevoUrl') as HTMLInputElement).value;

      this.publicidadService.SubirImagen(this.imagenSeleccionada).subscribe(
        (response) => {
          const nombreImagen = response.nombreImagen;

          const nuevaPublicidad: Publicidad = {
            idPublicidad: 0,
            imagenPublicidad: nombreImagen,
            linkPublicidad: linkDestino,
            nombrePublicidad: nombrePublicidad
          };

          this.publicidadService.CrearPublicidad(nuevaPublicidad).subscribe(
            (data) => {
              this.obtenerPublicidades();
              this.cerrarModal();
            }
          );
        }
        
      );
    }
  }

  cerrarModal() {
    const modal = document.getElementById('crearAnuncioModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-modal', 'false');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }

}