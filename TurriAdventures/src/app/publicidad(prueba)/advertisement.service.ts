import { Injectable } from '@angular/core';
import { Advertisement } from './advertisement.model';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  advertisements: Advertisement[] = [
    { imageUrl: 'assets/Anuncios/Maxi Pali.jpg', pageUrl: 'https://www.maxipali.co.cr/' },
    { imageUrl: 'assets/Anuncios/gama.jpg', pageUrl: 'https://galletasgama.com/' },
    // Agrega más anuncios según sea necesario
  ];

  constructor() { }

  getAdvertisements(): Advertisement[] {
    return this.advertisements;
  }
}
