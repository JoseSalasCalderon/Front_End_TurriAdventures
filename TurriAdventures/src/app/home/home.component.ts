import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeService } from '../../Core/HomeService';
import { Home } from '../../Model/Home';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
imagenHome: string = '';
description: string = '';

constructor (private homeService: HomeService){
}

ngOnInit(): void {
  this.obtenerHome();
}

obtenerHome(): void {
  this.homeService.ListarHomes().subscribe((data: Home[]) => {
    if (data.length > 0) {
      this.description = data[0].descripcionHome;
      this.imagenHome = data[0].imagenHome;
    }
    console.log('descripcion', this.description);
    console.log('imagen', this.imagenHome);

  });
}

}
