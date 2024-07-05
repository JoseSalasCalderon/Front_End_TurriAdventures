import { Component } from '@angular/core';
import { Oferta } from '../../Model/Oferta';
import { OfertaService } from '../../Core/OfertaService';
import { Router, RouterModule } from '@angular/router';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-ofertas',
  standalone: true,
  imports: [RouterModule, SidebarAdministradorComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './listar-ofertas.component.html',
  styleUrls: ['./listar-ofertas.component.css']
})
export class ListarOfertasComponent {
  OfertaPorPagina: number = 3; 
  paginaActual: number = 1;
  listaEstados: Oferta[] = [];
  successMessage: string = '';

  constructor(private ofertaService: OfertaService, public router: Router) {}

  ngOnInit(): void {
    this.obtenerEstados();
  }

  obtenerEstados(): void {
    this.ofertaService.ListarOfertas().subscribe((data: Oferta[]) => {
      const inicio = (this.paginaActual - 1) * this.OfertaPorPagina;
      const fin = this.paginaActual * this.OfertaPorPagina;
      this.listaEstados = data.slice(inicio, fin);
    });
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.obtenerEstados();
  }

  eliminarOferta(id: number): void {
    this.ofertaService.EliminarOferta(id).subscribe(
      response => {
        this.successMessage = 'La oferta se ha eliminado correctamente.';
        setTimeout(() => {
          this.successMessage = '';
          this.obtenerEstados();
        }, 2000);
      },
      error => {
        console.error('Error al eliminar la oferta', error);
      }
    );
  }
}