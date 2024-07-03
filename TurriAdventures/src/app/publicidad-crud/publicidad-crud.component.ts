// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { SidebarAdministradorComponent } from "../sidebar-administrador/sidebar-administrador.component";
// import { Publicidad } from '../../Model/Publicidad';
// import { PublicidadService } from '../../Core/PublicidadService';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-publicidad-crud',
//   standalone: true,
//   templateUrl: './publicidad-crud.component.html',
//   styleUrl: './publicidad-crud.component.css',
//   imports: [CommonModule, SidebarAdministradorComponent]
// })
// export class PublicidadCRUDComponent implements OnInit {
//   publicidades: Publicidad[] = [];
//   imagenActual: string = '';
//   nombrePublicidad: string = '';
//   url: string = '';
//   busquedaPublicidad: string = '';
//   imagenSeleccionada: File | null = null;
//   mensaje: string = '';
//   esError: boolean = false;

//   @ViewChild('fileInput') fileInput!: ElementRef;

//   constructor(
//     private publicidadService: PublicidadService,
//     private router: Router
//     ) { }

//   ngOnInit(): void {
//     this.obtenerPublicidades();
//   }

//   obtenerPublicidades(): void {
//     this.publicidadService.ListarPublicidades().subscribe((publicidades: Publicidad[]) => {
//       publicidades.sort((a, b) => b.idPublicidad - a.idPublicidad);
//       this.publicidades = publicidades;

//       // if (this.publicidades.length > 0) {
//         this.imagenActual = this.publicidades[0].imagenPublicidad; 
//         this.nombrePublicidad = this.publicidades[0].nombrePublicidad;
//         this.url = this.publicidades[0].linkPublicidad;
//       // }

//     });
//   }

//   buscarPublicidad() {
//     if (this.busquedaPublicidad != '') {
//       this.publicidadService.BuscarPublicidadPorNombre(this.busquedaPublicidad).subscribe((data: Publicidad) => {
//         if (data) {
//           // this.publicidades = [];
//           // this.publicidades.push(data);
//           // this.imagenActual = data.imagenPublicidad;
//           // this.nombrePublicidad = data.nombrePublicidad;
//           // this.url = data.linkPublicidad; 

//           this.publicidades = [data];
//           this.imagenActual = data.imagenPublicidad;
//           this.nombrePublicidad = data.nombrePublicidad;
//           this.url = data.linkPublicidad;
//         } else {
//         this.mostrarMensaje('No se encontró la publicidad', true);
//         }
//       });
//     } else {
//       this.mostrarMensaje('Error en la búsqueda.', true);
//     }
//   }

//   mostrarMensaje(mensaje: string, esError: boolean) {
//     this.mensaje = mensaje;
//     this.esError = esError;
//     setTimeout(() => {
//       this.mensaje = '';
//     }, 3000);
//   }

//   onInputChange(field: 'busquedaPublicidad' | 'nombrePublicidad' | 'url', value: string) {
//     this[field] = value;
//   }

//   aceptarCambios() {
//     if (!this.publicidades.length) return; 
//     const publicidad = this.publicidades[0];
//     publicidad.nombrePublicidad = this.nombrePublicidad;
//     publicidad.linkPublicidad = this.url;

    
//     if (this.imagenSeleccionada) {
//       this.publicidadService.SubirImagen(this.imagenSeleccionada).subscribe(
//       (response) => {
//           publicidad.imagenPublicidad = response.secure_url;
//           this.actualizarPublicidad(publicidad);
//         },

//         (error) => {
//           this.mostrarMensaje('Error al subir la imagen', true);
//         }

//       );
//     } else {
//       this.actualizarPublicidad(publicidad); 
//     }
//   }

//   actualizarPublicidad(publicidad: Publicidad) {
//     this.publicidadService.EditarPublicidad(publicidad).subscribe(
//       (response) => {
//         this.mostrarMensaje('La publicidad se ha actualizado exitosamente', false);
//       },
//       (error) => {
//       this.mostrarMensaje('Error al actualizar la publicidad', true);
//       }
//     );
//   }

//   onChangeImagen(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files[0]) {
//       this.imagenSeleccionada = input.files[0];

//       const reader = new FileReader(); 
    
//       // reader.onload = (e: any) => {
//       //   const imagenActualElement = document.getElementById('imagenActual');
//       //   if (imagenActualElement) {
//       //     imagenActualElement.setAttribute('src', e.target.result);
//       //   }
//       // };

//       reader.onload = (e: any) => {
//         this.imagenActual = e.target.result;
//       };

//       reader.readAsDataURL(input.files[0]);
//     }
//   }

//   crearPublicidad() {
//     const modal = document.getElementById('crearAnuncioModal');
//     if (modal) {
//       modal.classList.add('show');
//       modal.style.display = 'block';
//       modal.setAttribute('aria-modal', 'true');
//       modal.setAttribute('aria-hidden', 'false');
//       document.body.classList.add('modal-open');
//       const backdrop = document.createElement('div');
//       backdrop.classList.add('modal-backdrop', 'fade', 'show');
//       document.body.appendChild(backdrop);
//     }

//     this.obtenerPublicidades();
//   }

//   guardarImagen(event: Event) {
//     event.preventDefault();
//     const nombrePublicidad = (document.getElementById('nuevoNombre') as HTMLInputElement).value;
//     const linkDestino = (document.getElementById('nuevoUrl') as HTMLInputElement).value;

//     if (this.imagenSeleccionada) {
//       this.publicidadService.SubirImagen(this.imagenSeleccionada).subscribe(
//         (response) => {
//           const nuevaPublicidad: Publicidad = {
//             idPublicidad: 0,
//             imagenPublicidad: response.secure_url, // URL segura de Cloudinary
//             linkPublicidad: linkDestino,
//             nombrePublicidad: nombrePublicidad
//           };

//           this.publicidadService.CrearPublicidad(nuevaPublicidad).subscribe(
//             (data) => {
//               this.obtenerPublicidades();
//               this.cerrarModal();
//             }
//           );
//         },
//         (error) => {
//           this.mostrarMensaje('Error al subir la imagen', true);
//         }
//       );
//     }
//   }

//   cerrarModal() {
//     const modal = document.getElementById('crearAnuncioModal');
//     if (modal) {
//       modal.classList.remove('show');
//       modal.style.display = 'none';
//       modal.setAttribute('aria-modal', 'false');
//       modal.setAttribute('aria-hidden', 'true');
//       document.body.classList.remove('modal-open');
//       const backdrop = document.querySelector('.modal-backdrop');
//       if (backdrop) {
//         backdrop.remove();
//       }
//     }
//   }

//   eliminarPublicidad(idPublicidad: number) {
//     this.publicidadService.EliminarPublicidad(idPublicidad).subscribe(() => {
//       this.obtenerPublicidades();
//     });
//   }

// }


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarAdministradorComponent } from "../sidebar-administrador/sidebar-administrador.component";
import { Publicidad } from '../../Model/Publicidad';
import { PublicidadService } from '../../Core/PublicidadService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicidad-crud',
  standalone: true,
  templateUrl: './publicidad-crud.component.html',
  styleUrls: ['./publicidad-crud.component.css'],
  imports: [CommonModule, SidebarAdministradorComponent]
})
export class PublicidadCRUDComponent implements OnInit {
  publicidades: Publicidad[] = [];
  imagenActual: string = '';
  nombrePublicidad: string = '';
  url: string = '';
  busquedaPublicidad: string = '';
  imagenSeleccionada: File | null = null;
  mensaje: string = '';
  esError: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private publicidadService: PublicidadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerPublicidades();
  }

  obtenerPublicidades(): void {
    this.publicidadService.ListarPublicidades().subscribe((publicidades: Publicidad[]) => {
      publicidades.sort((a, b) => b.idPublicidad - a.idPublicidad);
      this.publicidades = publicidades;

      if (this.publicidades.length > 0) {
        this.imagenActual = this.publicidades[0].imagenPublicidad;
        this.nombrePublicidad = this.publicidades[0].nombrePublicidad;
        this.url = this.publicidades[0].linkPublicidad;
      }

    });
  }

  buscarPublicidad() {
    if (this.busquedaPublicidad !== '') {
      this.publicidadService.BuscarPublicidadPorNombre(this.busquedaPublicidad).subscribe((data: Publicidad) => {
        if (data) {
          this.publicidades = [data];
          this.imagenActual = data.imagenPublicidad;
          this.nombrePublicidad = data.nombrePublicidad;
          this.url = data.linkPublicidad;
        } else {
          this.mostrarMensaje('No se encontró la publicidad', true);
        }
      });
    } else {
      this.mostrarMensaje('Error en la búsqueda.', true);
    }
  }

  mostrarMensaje(mensaje: string, esError: boolean) {
    this.mensaje = mensaje;
    this.esError = esError;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  onInputChange(field: 'busquedaPublicidad' | 'nombrePublicidad' | 'url', value: string) {
    this[field] = value;
  }

  aceptarCambios() {
    if (!this.publicidades.length) return;

    const nombreValido = this.nombrePublicidad.trim().length >= 2;
    const urlValido = this.url.trim().length >= 2;

    if (!nombreValido || !urlValido) {
      this.mostrarMensaje('Error en los datos.', true);
      return;
    }

    const publicidad = this.publicidades[0];
    publicidad.nombrePublicidad = this.nombrePublicidad;
    publicidad.linkPublicidad = this.url;

    if (this.imagenSeleccionada) {
      this.publicidadService.SubirImagen(this.imagenSeleccionada).subscribe(
        (response) => {
          publicidad.imagenPublicidad = response.secure_url;
          this.actualizarPublicidad(publicidad);
        },
        (error) => {
          this.mostrarMensaje('Error al subir la imagen', true);
        }
      );
    } else {
      this.actualizarPublicidad(publicidad);
    }
  }

  actualizarPublicidad(publicidad: Publicidad) {
    this.publicidadService.EditarPublicidad(publicidad).subscribe(
      (response) => {
        this.mostrarMensaje('La publicidad se ha actualizado exitosamente', false);
      },
      (error) => {
        this.mostrarMensaje('Error al actualizar la publicidad', true);
      }
    );
  }

  onChangeImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagenSeleccionada = input.files[0];

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagenActual = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
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
    const nombrePublicidad = (document.getElementById('nuevoNombre') as HTMLInputElement).value;
    const linkDestino = (document.getElementById('nuevoUrl') as HTMLInputElement).value;

    if (this.imagenSeleccionada) {
      this.publicidadService.SubirImagen(this.imagenSeleccionada).subscribe(
        (response) => {
          const nuevaPublicidad: Publicidad = {
            idPublicidad: 0,
            imagenPublicidad: response.secure_url, // URL segura de Cloudinary
            linkPublicidad: linkDestino,
            nombrePublicidad: nombrePublicidad
          };

          this.publicidadService.CrearPublicidad(nuevaPublicidad).subscribe(
            (data) => {
              this.obtenerPublicidades();
              this.cerrarModal();
            }
          );
        },
        (error) => {
          this.mostrarMensaje('Error al subir la imagen', true);
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

  eliminarPublicidad(idPublicidad: number) {
    this.publicidadService.EliminarPublicidad(idPublicidad).subscribe(() => {
      this.obtenerPublicidades();
    });
  }

}
