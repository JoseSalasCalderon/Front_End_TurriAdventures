import { Component , OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisements',
  standalone: true,
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.css',
  imports: [CommonModule] 
})
export class AdvertisementsComponent {
  currentAdvertisementIndex: number = 0;
  intervalId: any;

  images = ['assets/Facilidades/Hotel1.jpg', 'assets/Facilidades/Hotel2.jpg', 'assets/Facilidades/Hotel3.jpg'];

}