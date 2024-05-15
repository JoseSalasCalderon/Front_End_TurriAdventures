import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Advertisement {
  imageUrl: string;
  pageUrl: string;
}

@Component({
  selector: 'app-advertisements',
  standalone: true,
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.css',
  imports: [CommonModule]
})
export class AdvertisementsComponent implements OnInit, OnDestroy {
  advertisements: Advertisement[] = [
    { imageUrl: 'assets/Anuncios/Hotel2.png', pageUrl: 'https://totaltripviajes.com/hoteles-de-lujo/' },
    { imageUrl: 'assets/Anuncios/Maxi Pali.jpg', pageUrl: 'https://www.maxipali.co.cr/' },
    { imageUrl: 'assets/Anuncios/gama.jpg', pageUrl: 'https://galletasgama.com/' },
    // Agrega más anuncios según sea necesario
  ];
  currentAdvertisementIndex: number = 0;
  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextAdvertisement();
    }, 2000); // Cambia de anuncio cada 3 segundos
  }

  stopCarousel(): void {
    clearInterval(this.intervalId);
  }

  nextAdvertisement(): void {
    this.currentAdvertisementIndex = (this.currentAdvertisementIndex + 1) % this.advertisements.length;
  }

  openPage(url: string): void {
    window.open(url, '_blank');
  }
}
