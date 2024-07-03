import { Component } from '@angular/core';
import { HomeService } from '../../Core/HomeService';
import { Home } from '../../Model/Home';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadImagesServiceService } from '../../Core/upload-images-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modificar-home',
  standalone: true,
  imports: [SidebarAdministradorComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './modificar-home.component.html',
  styleUrl: './modificar-home.component.css'
})
export class ModificarHomeComponent {

  imagenHome: string = '';
  description: string = '';
  idHome: number = 0;
  homeForm: FormGroup;
  imagenes: string[] = [];
  imagenSeleccionada: File | null = null;
  mensaje: string = '';
  esError: boolean = false;

  constructor(private fb: FormBuilder, private homeService: HomeService, 
    private uploadImagesService: UploadImagesServiceService,     private router: Router,
  ) {
    this.homeForm = this.fb.group({
      description: ['', [Validators.required, this.descriptionValidator]]
    });
  }

  ngOnInit(): void {
    this.obtenerHome();
  }

  obtenerHome(): void {
    this.homeService.ListarHomes().subscribe((data: Home[]) => {
      if (data.length > 0) {
        this.idHome=data[0].idHome;
        this.description = data[0].descripcionHome;
        this.imagenHome = data[0].imagenHome;
        this.homeForm.patchValue({
          description: this.description
        });
      }
    });
  }

  onSubmit(): void {
         if (this.homeForm.valid && this.imagenHome) {
        this.uploadImagesService.subirImagen(this.imagenHome).subscribe(
          (respuesta) => {
            this.imagenes.push(respuesta.secure_url);
            const updatedHome: Home = {
              idHome: this.idHome,
              descripcionHome: this.homeForm.value.description,
              imagenHome: respuesta.secure_url
            };
            this.homeService.EditarHome(updatedHome).subscribe(response => {
              if (response === true) {
                this.mostrarMensaje('Home actualizada.', false);
                this.obtenerHome();
              } else {
                this.mostrarMensaje('Ocurrió un error al actualizar.', true);
              }
            });
            this.imagenHome = '';
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
            this.mostrarMensaje('Error al subir la imagen.', true);
          },
          () => {
            this.obtenerHome();
          }
        );
      }else {
        this.mostrarMensaje('Descripción inválida.', true);
      }
  }

  onChangeImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagenSeleccionada = input.files[0];

      const reader = new FileReader(); 
    
      reader.onload = (e: any) => {
        this.imagenHome = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  mostrarMensaje(mensaje: string, esError: boolean) {
    this.mensaje = mensaje;
    this.esError = esError;
    this.obtenerHome();
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
    this.obtenerHome();
  }

  private descriptionValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    // const invalidPattern = /[^a-zA-Z0-9\s¡!¿?.]/;
    const lettersPattern = /[a-zA-Z]{3,}/;

    if (!value || value.trim() === '' || !lettersPattern.test(value)) {
      return { 'invalidDescription': true };
    }
    return null;
  }
}
