import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { About } from '../../Model/About';
import { AboutService } from '../../Core/AboutService';
import { UploadImagesServiceService } from '../../Core/upload-images-service.service';
import { Router } from '@angular/router';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';

@Component({
  selector: 'app-about-crud',
  standalone: true,
  templateUrl: './about-crud.component.html',
  styleUrls: ['./about-crud.component.css'],
  imports: [CommonModule, SidebarAdministradorComponent],
})
export class AboutCrudComponent implements OnInit {
  descripcion: string = '';
  imagenes: string[] = [];
  imagenSeleccionada: string = '';
  about!: About[];
  vistaPreviaImagen: string | ArrayBuffer | null = null;
    
  currentPage: number = 1;
  pageSize: number = 8; 

  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private aboutService: AboutService,
    private uploadImagesService: UploadImagesServiceService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.obtenerNosotros();
  }


  async obtenerNosotros() {
    this.aboutService.ListarNosotros().subscribe((data: About[]) => {
      if (data.length > 0) {
        this.descripcion = data[0].descripcionNosotros;
        this.imagenes = data.map(item =>  item.imagenNosotros);
        this.imagenSeleccionada = this.imagenes[this.imagenes.length - 1];
        this.about = data;
      }
      console.log('about ts', this.about);

    });
  }

  mostrarImagen(urlImagen: string): void {
    this.imagenSeleccionada = urlImagen;
  }

  onArchivoSeleccionado(evento: any): void {
    if (evento.target.files && evento.target.files[0]) {
      const archivo = evento.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.vistaPreviaImagen = e.target.result;
      };
      reader.readAsDataURL(archivo);
    }
  }
  
  subirNuevaImagen(): void {
    if (this.vistaPreviaImagen) {
      this.uploadImagesService.subirImagen(this.vistaPreviaImagen).subscribe(
        (respuesta) => {
          this.imagenes.push(respuesta.secure_url);
          console.log('ruta imagen', respuesta.secure_url);
          const nuevoNosotros: About = {
            idNosotros: 0,
            descripcionNosotros: this.descripcion,
            imagenNosotros: respuesta.secure_url
          };
          this.aboutService.CrearNosotros(nuevoNosotros).subscribe(response => {
            if (response === true) {
              this.mostrarMensaje('Imagen subida correctamente.', false);
              this.obtenerNosotros();
            } else {
              this.mostrarMensaje('No se pudo subir la imagen.', true);
            }
          });
          this.vistaPreviaImagen = null;
          this.imagenSeleccionada = '';
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
          this.mostrarMensaje('Error al subir la imagen.', true);
        },
        () => {
          this.obtenerNosotros(); // Llamada a obtenerNosotros() después de completar la subida de imagen
        }
      );
    }
  }

  confirmarEliminarImagen(idImagen: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta imagen?')) {
      this.eliminarImagen(idImagen);
    }
  }

  eliminarImagen(idImagen: number): void {
    console.log('about ts a eliminar', this.about[idImagen].idNosotros);
    this.aboutService.EliminarNosotros(this.about[idImagen].idNosotros)
      .subscribe(() => {
        this.mostrarMensaje('La imagen se ha eliminado con éxito.', false);
        this.obtenerNosotros(); 
      }, error => {
        console.error('Error al eliminar la imagen:', error);
        this.mostrarMensaje('Error al eliminar la imagen.', true);

      });
  }

  cancelarCambios(): void {
    this.router.navigate(['/modificarpaginas']);
  }
  
  actualizarDescripcion(newDescription: string){
    const aboutToUpdate: About = {
      idNosotros: this.about[0].idNosotros,  // Asegúrate de que estás usando el ID correcto
      descripcionNosotros: newDescription,
     imagenNosotros: this.about[0].imagenNosotros  // Asegúrate de que estás usando la imagen correcta
   };

   this.aboutService.EditarNosotros(aboutToUpdate).subscribe(
    (response) => {
      this.mostrarMensaje('La descripción se ha actualizado correctamente.', false);
      this.obtenerNosotros();
    },
    (error) => {
      this.mostrarMensaje('Error al actualizar la descripción.', true);
    }
  );
}

  crearImagen() {
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
      this.obtenerNosotros();

    }

  }

  mostrarMensaje(mensaje: string, esError: boolean) {
    this.mensaje = mensaje;
    this.esError = esError;
    this.obtenerNosotros();
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
    this.obtenerNosotros();
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

  imagenesPaginadas(): string[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.imagenes.slice(startIndex, endIndex);
  }
  
  totalPages(): number[] {
    const total = Math.ceil(this.imagenes.length / this.pageSize);
    return Array(total).fill(0).map((x, i) => i + 1);
  }
  
  cambiarPagina(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  

}