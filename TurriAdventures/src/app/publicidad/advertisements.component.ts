import { Component , OnInit, OnDestroy } from '@angular/core';
import { Advertisement } from './advertisement.model';
import { AdvertisementService } from './advertisement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisements',
  standalone: true,
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.css',
  imports: [CommonModule] 
})
export class AdvertisementsComponent implements OnInit, OnDestroy {
  advertisements: Advertisement[] = [];
  currentAdvertisementIndex: number = 0;
  intervalId: any;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    this.advertisements = this.advertisementService.getAdvertisements();
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