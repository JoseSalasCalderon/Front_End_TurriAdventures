import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Publicidad } from '../../Model/Publicidad';
import { PublicidadService } from '../../Core/PublicidadService';

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

  advertisements: Publicidad[] = [];
  currentAdvertisementIndex: number = 0;
  intervalId: any;

  constructor(private publicidadService: PublicidadService) { }

  ngOnInit(): void {
    this.obtenerPublicidades();
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  obtenerPublicidades(): void {
    this.publicidadService.ListarPublicidades()
      .subscribe((publicidades: Publicidad[]) => {
        this.advertisements = publicidades.map(ad => {
          return { ...ad, imagenPublicidad: ad.imagenPublicidad };
         // return { ...ad, imagenPublicidad: '' + ad.imagenPublicidad };
          //return { ...ad, imagenPublicidad: '' + ad.imagenPublicidad };
        });
      });
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextAdvertisement();
    }, 5000); 
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
