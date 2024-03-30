import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  imports: [CommonModule]

})
export class AboutComponent {
  images: string[] = [
    
    'assets/Facilidades/Hotel.jpg',
    'assets/Facilidades/actividades-mercantiles-1.webp',
 'assets/Facilidades/interioe-hotel.webp',
  'assets/Facilidades/OIP (1).jpg',
'assets/Facilidades/OIP.jpg',
'assets/Facilidades/R (1).jpg',
'assets/Facilidades/R.jpg',
'assets/Facilidades/servicios-hotel-1024x320.jpg',
'assets/Facilidades/standard.jpg',
'assets/Facilidades/Hotel.jpg',
'assets/Facilidades/actividades-mercantiles-1.webp',
'assets/Facilidades/interioe-hotel.webp',
'assets/Facilidades/OIP (1).jpg',
'assets/Facilidades/OIP.jpg',

'assets/Facilidades/Hotel.jpg',
    'assets/Facilidades/actividades-mercantiles-1.webp',
 'assets/Facilidades/interioe-hotel.webp',
  'assets/Facilidades/OIP (1).jpg',
'assets/Facilidades/OIP.jpg',
'assets/Facilidades/R (1).jpg',
'assets/Facilidades/R.jpg',
'assets/Facilidades/servicios-hotel-1024x320.jpg',
'assets/Facilidades/standard.jpg',
'assets/Facilidades/Hotel.jpg',
'assets/Facilidades/actividades-mercantiles-1.webp',
'assets/Facilidades/interioe-hotel.webp',
'assets/Facilidades/OIP (1).jpg',
'assets/Facilidades/OIP.jpg','assets/Facilidades/Hotel.jpg',
'assets/Facilidades/actividades-mercantiles-1.webp',
'assets/Facilidades/interioe-hotel.webp',
'assets/Facilidades/OIP (1).jpg',
'assets/Facilidades/OIP.jpg',
'assets/Facilidades/R (1).jpg',
'assets/Facilidades/R.jpg',
'assets/Facilidades/servicios-hotel-1024x320.jpg',
'assets/Facilidades/standard.jpg',
'assets/Facilidades/Hotel.jpg',
'assets/Facilidades/actividades-mercantiles-1.webp',
'assets/Facilidades/interioe-hotel.webp',
'assets/Facilidades/OIP (1).jpg',
'assets/Facilidades/OIP.jpg'
];  
selectedImage: string = this.images[0];

  showImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }
}
