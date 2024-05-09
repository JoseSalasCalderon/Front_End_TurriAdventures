import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Image {
  imgSrc: string;
  imgAlt: string;
  link: string;
}

@Component({
  selector: 'app-advertisements',
  standalone: true,
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.css',
  imports: [CommonModule]
})
export class AdvertisementsComponent implements OnInit {
  // currentAdvertisementIndex: number = 0;
  // intervalId: any;

  // images = ['assets/Anuncios/Hotel2.png', 'assets/Anuncios/gama.jpg'];
  // urls = ['https://totaltripviajes.com/hoteles-de-lujo/', 'https://galletasgama.com/'];

  images: Image[] = [];
  selectedIndex = 0;

  ngOnInit(): void {
    this.loadImages();

    setInterval(() => {
      this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
    }, 5000);
  }

  loadImages() {
    this.images = [
      {
        imgSrc: 'assets/Anuncios/Hotel2.png',
        imgAlt: 'Hotel2',
        link: 'https://totaltripviajes.com/hoteles-de-lujo/'
      },
      {
        imgSrc: 'assets/Anuncios/gama.jpg',
        imgAlt: 'Gama',
        link: 'https://galletasgama.com/'
      }
    ];
  }
}