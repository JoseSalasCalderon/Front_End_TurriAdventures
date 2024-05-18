import { Component } from '@angular/core';
import { Oferta } from '../../Model/Oferta';
import { OfertaService } from '../../Core/OfertaService';
import { Router, RouterModule} from '@angular/router';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-ofertas',
  standalone: true,
  imports: [RouterModule,SidebarAdministradorComponent,HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './listar-ofertas.component.html',
  styleUrl: './listar-ofertas.component.css'
})
export class ListarOfertasComponent {

  OfertaPorPagina: number = 3; 
  paginaActual: number = 1;
  listaEstados: Oferta[] = [];

  constructor(private OfertaService: OfertaService) { }

  ngOnInit(): void {
    this.obtenerEstados();
  }

  obtenerEstados() {
    const inicio = (this.paginaActual - 1) * this.OfertaPorPagina;
    const fin = this.paginaActual * this.OfertaPorPagina;
    this.OfertaService.ListarOfertas().subscribe((data: Oferta[]) => {
      this.listaEstados = data.slice(inicio, fin); 
    });
  }

  
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.obtenerEstados();
  }


}
