import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { About } from '../../Model/About';
import { AboutService } from '../../Core/AboutService';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UploadImagesServiceService } from '../../Core/upload-images-service.service';
import { concatMap, map, toArray } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-about-crud',
  standalone: true,
  templateUrl: './about-crud.component.html',
  styleUrls: ['./about-crud.component.css'],
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  encapsulation: ViewEncapsulation.None,
})
export class AboutCrudComponent implements OnInit {
  descripcion: string = '';
  imagenes: string[] = [];
  imagenSeleccionada: string = '';
  descripcionOriginal: string = '';
  imagenesOriginales: string[] = [];
  about!: About[];

  constructor(
    private aboutService: AboutService,
    private uploadImagesService: UploadImagesServiceService
  ) { }

  ngOnInit(): void {
    this.obtenerNosotros();
  }


  obtenerNosotros(): void {
    this.aboutService.ListarNosotros().subscribe((data: About[]) => {
      if (data.length > 0) {
        this.descripcion = data[0].descripcionNosotros;
        this.imagenes = data.map(item => 'assets/Facilidades/' + item.imagenNosotros);
        this.imagenSeleccionada = this.imagenes[this.imagenes.length - 1];
        this.descripcionOriginal = this.descripcion;
        this.imagenesOriginales = [...this.imagenes];
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
      // Solo actualiza la imagen seleccionada, no la subas todavía
      const archivo = evento.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenSeleccionada = e.target.result;
      };
      reader.readAsDataURL(archivo);
    }
  }


  subirNuevaImagen(): void {
    // Verifica que haya una imagen seleccionada
    if (this.imagenSeleccionada) {
      this.uploadImagesService.subirImagen(this.imagenSeleccionada).subscribe(
        (respuesta) => {
          // Agrega la URL de la imagen subida a tu lista de imágenes
          this.imagenes.push(respuesta.secure_url);
          console.log('ruta imagen', respuesta.secure_url);

          const nuevoNosotros: About = {
            idNosotros: 0, // Esto dependerá de cómo esté configurada tu API
            descripcionNosotros: this.descripcion,
            imagenNosotros: respuesta.secure_url
          };
          this.aboutService.CrearNosotros(nuevoNosotros).subscribe(response => {
            // Abrir modal si la respuesta es true o false
            if (response = true) {
              console.log('Actualizó correctamente.');
            } else {
              console.log('No se pudo actualizar.');
            }

          });

          // Limpia la imagen seleccionada después de subirla
          this.imagenSeleccionada = '';

        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }
  
  eliminarImagen(idImagen: number): void {
    console.log('about ts a eliminar', this.about[idImagen].idNosotros);
    this.aboutService.EliminarNosotros(this.about[idImagen].idNosotros)
      .subscribe(() => {
        console.log('Imagen eliminada con éxito');
        this.obtenerNosotros(); // Actualiza la lista de imágenes después de eliminar
      }, error => {
        console.error('Error al eliminar la imagen:', error);
      });
  }

  // subirImagenesSecuencialmente(): Observable<string[]> {
  //   // Sube cada imagen secuencialmente y espera a que se complete antes de subir la siguiente
  //   return from(this.imagenes).pipe(
  //     concatMap((imagen) => this.uploadImagesService.subirImagen(imagen)),
  //     map((respuesta) => respuesta.secure_url),
  //     toArray()
  //   );
  // }

  // guardarCambios(nuevaDescripcion: string): void {
  //   // Asigna la nueva descripción
  //   this.descripcion = nuevaDescripcion;

  //   // Sube cada imagen de forma secuencial y luego guarda los cambios
  //   this.subirImagenesSecuencialmente().subscribe(
  //     (urlsImagenes) => {
  //       // Crea una nueva entrada para "Nosotros" con la nueva descripción y las URLs de las imágenes subidas
  //       const nuevoNosotros: About = {
  //         idNosotros: 0, // Esto dependerá de cómo esté configurada tu API
  //         descripcionNosotros: this.descripcion,
  //         imagenNosotros: urlsImagenes// Concatena las URLs de las imágenes con comas
  //       };

  //       // Llama al servicio para crear la nueva entrada de "Nosotros"
  //       this.aboutService.CrearNosotros(nuevoNosotros).subscribe(
  //         () => {
  //           alert('Cambios guardados');
  //           // Vuelve a cargar los datos de "Nosotros" para reflejar los cambios en la interfaz
  //           this.obtenerNosotros();
  //         },
  //         (error) => {
  //           console.error('Error al guardar los cambios:', error);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.error('Error al subir las imágenes:', error);
  //     }
  //   );
  // }

  cancelarCambios(): void {
    this.descripcion = this.descripcionOriginal;
    this.imagenes = [...this.imagenesOriginales];
    this.imagenSeleccionada = this.imagenes.length > 0 ? this.imagenes[this.imagenes.length - 1] : '';
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
    }

    this.obtenerNosotros();
  }

  // guardarImagen(event: Event) {
  //   event.preventDefault();
  //   if (this.imagenSeleccionada) {
  //     this.uploadImagesService.subirImagen(this.imagenSeleccionada).subscribe(
  //       (response) => {
  //         const nuevaPublicidad: About = {
  //           idNosotros: 0,
  //           imagenNosotros: response.secure_url,
  //           descripcionNosotros: ''
  //         };

  //         this.aboutService.CrearNosotros(nuevaPublicidad).subscribe(
  //           (data) => {
  //             this.obtenerNosotros();
  //             this.cerrarModal();
  //           }
  //         );
  //       },
  //       (error) => {
  //         this.mostrarMensaje('Error al subir la imagen', true);
  //       }
  //     );
  //   }
  // }

  // onChangeImagen(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     this.imagenSeleccionada = input.files[0];

  //     const reader = new FileReader(); 

  //     // reader.onload = (e: any) => {
  //     //   const imagenActualElement = document.getElementById('imagenActual');
  //     //   if (imagenActualElement) {
  //     //     imagenActualElement.setAttribute('src', e.target.result);
  //     //   }
  //     // };

  //     reader.onload = (e: any) => {
  //       this.imagenActual = e.target.result;
  //     };

  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }
  mensaje: string = '';
  esError: boolean = false;

  mostrarMensaje(mensaje: string, esError: boolean) {
    this.mensaje = mensaje;
    this.esError = esError;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
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
