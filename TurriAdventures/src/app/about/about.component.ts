import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ViewEncapsulation } from '@angular/core';
import { AboutService } from '../../Core/AboutService';
import { About } from '../../Model/About';

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

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.obtenerNosotros();
  }

  obtenerNosotros(): void {
    this.aboutService.ListarNosotros().subscribe((data: About[]) => {
      if (data.length > 0) {
        this.description = data[1].descripcionNosotros;
        this.images = data.map(item => 'assets/Facilidades/' + item.imagenNosotros);
        this.selectedImage = this.images[0];
      }
    });
  }

  showImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }
}
