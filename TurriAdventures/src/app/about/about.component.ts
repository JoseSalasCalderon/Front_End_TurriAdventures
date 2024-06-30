import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ViewEncapsulation } from '@angular/core';
import { AboutService } from '../../Core/AboutService';
import { About } from '../../Model/About';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, SidebarComponent, HeaderComponent]

})

export class AboutComponent implements OnInit {
  description: string = '';
  images: string[] = [];
  selectedImage: string = '';
  errorMessage: string = '';

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.obtenerNosotros();
  }

  obtenerNosotros(): void {
    this.aboutService.ListarNosotros().subscribe({
      next: (data: About[]) => {
        if (data.length > 0) {
          this.description = data[0].descripcionNosotros;
          this.images = data.map(item => 'assets/Facilidades/' + item.imagenNosotros);
          this.selectedImage = this.images[0];
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No hay información disponible.';
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Error al cargar la información. Intente nuevamente más tarde.';
        console.error('ERROR', error);
      }
    });
  }

  showImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }


  currentPage: number = 1;
  pageSize: number = 18; 

  imagenesPaginadas(): string[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.images.slice(startIndex, endIndex);
  }
  
  totalPages(): number[] {
    const total = Math.ceil(this.images.length / this.pageSize);
    return Array(total).fill(0).map((x, i) => i + 1);
  }
  
  cambiarPagina(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
