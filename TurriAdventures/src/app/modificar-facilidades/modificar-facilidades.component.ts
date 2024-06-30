import { Component } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Facilidad } from '../../Model/Facilidad';
import { FacilidadService } from '../../Core/FacilidadService';


@Component({
  selector: 'app-modificar-facilidades',
  standalone: true,
  imports: [SidebarAdministradorComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './modificar-facilidades.component.html',
  styleUrl: './modificar-facilidades.component.css'
})
export class ModificarFacilidadesComponent {
  imagenHome: String = '';
  description: String = '';
  idHome: number = 0;
  homeForm: FormGroup;

  constructor(private fb: FormBuilder, private homeService: FacilidadService) {
    this.homeForm = this.fb.group({
      description: ['']
    });
  }

  ngOnInit(): void {
    this.obtenerHome();
  }

  obtenerHome(): void {
    this.homeService.ListarFacilidades().subscribe((data: Facilidad[]) => {
      if (data.length > 0) {
        this.idHome=data[0].idFacilidad;
        this.description = data[0].descripcionFacilidad;
        this.imagenHome = data[0].imagenFacilidad;
        this.homeForm.patchValue({
          description: this.description
        });
      }
    });
  }

  onSubmit(): void {
    if (this.homeForm.valid) {
      const updatedHome: Facilidad = {
        idFacilidad:this.idHome,
        descripcionFacilidad: this.homeForm.value.description,
        imagenFacilidad: this.imagenHome 
      };
      console.log(this.idHome)
      this.homeService.EditarFacilidad(updatedHome).subscribe(
        response => {
          alert('Descripción actualizada exitosamente');
        },
        error => {
          alert('Ocurrió un error al actualizar la descripción');
        }
      );
    }
  }
}
