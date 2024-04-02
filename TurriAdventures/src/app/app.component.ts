import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AboutComponent } from "./about/about.component";
import { ReserveComponent } from "./reservacion/reserve.component";
import { AdvertisementsComponent } from './publicidad/advertisements.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdvertisementsComponent, RouterOutlet, HomeComponent, HeaderComponent, FooterComponent, SidebarComponent, AboutComponent, ReserveComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TurriAdventures';
}
