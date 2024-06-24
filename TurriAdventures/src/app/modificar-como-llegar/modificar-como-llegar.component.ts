import { Component } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { Direccion } from '../../Model/Direccion';
import { DireccionService } from '../../Core/DireccionService';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modificar-como-llegar',
  standalone: true,
  imports: [CommonModule,SidebarAdministradorComponent, FormsModule],
  templateUrl: './modificar-como-llegar.component.html',
  styleUrl: './modificar-como-llegar.component.css'
})
export class ModificarComoLlegarComponent {

  direccion: Direccion | null = null;
  infoDireccion: String = '';
  successMessage: string | null = null;

    constructor(
        private DireccionesService: DireccionService,
    ) { }

    ngOnInit(): void {
        this.obtenerDireccion();
    }

    obtenerDireccion() {
        return this.DireccionesService.BuscarDireccion(1).subscribe((direccion: Direccion) => {
            this.direccion = direccion;
            this.infoDireccion = direccion.informacionDireccion;
        });
    }

    actualizar() {
      // Verificar si existe idDireccion antes de llamar al servicio
      if (this.direccion?.idDireccion != null) {
        this.direccion.informacionDireccion = this.infoDireccion;
        // Llamar al servicio para actualizar dirección
        return this.DireccionesService.ActualizarDireccion(this.direccion)
          .subscribe(response => {
            if (response) {
              this.successMessage = 'Actualizó correctamente.';
              setTimeout(() => {
                this.successMessage = '';
              }, 3000);
            }else {
              this.successMessage = 'No se pudo actualizar';
              setTimeout(() => {
                this.successMessage = '';
              }, 3000);
            }
          });
      } else {
        return null;
      }
    }
    
}
