import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent,CommonModule, RouterModule],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.css'
})
export class RatesComponent {
  prices: { roomType: string, priceLowSeason: number, priceHighSeason: number }[] = [
    { roomType: 'Habitación Doble', priceLowSeason: 120, priceHighSeason: 150 },
    { roomType: 'Suite Ejecutiva', priceLowSeason: 180, priceHighSeason: 200 },
    { roomType: 'Habitación Estándar', priceLowSeason: 80, priceHighSeason: 100 }
  ];


  isHighSeason(): boolean {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentDay = currentDate.getDate();
    return (

      (currentMonth >= 12 && currentMonth <= 2) ||

      (currentMonth === 4 && currentDay >= 14 && currentDay <= 21) ||

      (currentMonth === 7 && currentDay >= 15) ||
      (currentMonth === 8 && currentDay <= 31)
    );
  }
}
