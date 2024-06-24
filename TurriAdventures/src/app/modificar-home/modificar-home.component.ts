import { Component } from '@angular/core';
import { HomeService } from '../../Core/HomeService';
import { Home } from '../../Model/Home';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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

  constructor(private fb: FormBuilder, private homeService: HomeService) {
    this.homeForm = this.fb.group({
      description: ['']
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
    if (this.homeForm.valid) {
      const updatedHome: Home = {
        idHome:this.idHome,
        descripcionHome: this.homeForm.value.description,
        imagenHome: this.imagenHome 
      };
      console.log(this.idHome)
      this.homeService.EditarHome(updatedHome).subscribe(
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
