import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { TipoHabitacionService } from '../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../Model/TipoHabitacion';
import { OfertaService } from '../../Core/OfertaService';
import { TemporadaService } from '../../Core/TemporadaService';
import { Oferta } from '../../Model/Oferta';
import { Temporada } from '../../Model/Temporada';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, CommonModule, RouterModule],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.css'
})
export class RatesComponent implements OnInit {

  tiposHabitacion: TipoHabitacion[] = [];
  ofertas: Oferta[] = [];
  temporadas: Temporada[] = [];

  constructor(
    private tipoHabitacionService: TipoHabitacionService,
    private ofertaService: OfertaService,
    private temporadaService: TemporadaService
  ) {}

  ngOnInit(): void {
    this.listarTiposHabitaciones();
    this.listarOfertas();
    this.listarTemporadas();
  }

  listarTiposHabitaciones(): void {
    this.tipoHabitacionService.ListarTiposHabitaciones().subscribe(
      (tipos: TipoHabitacion[]) => {
        this.tiposHabitacion = tipos;
      },
      (error) => {
        console.error('Error al obtener tipos de habitación:', error);
      }
    );
  }

  listarOfertas(): void {
    this.ofertaService.ListarOfertas().subscribe(
      (ofertas: Oferta[]) => {
        this.ofertas = ofertas;
      },
      (error) => {
        console.error('Error al obtener ofertas:', error);
      }
    );
  }

  listarTemporadas(): void {
    this.temporadaService.ListarTemporadas().subscribe(
      (temporadas: Temporada[]) => {
        this.temporadas = temporadas;
      },
      (error) => {
        console.error('Error al obtener temporadas:', error);
      }
    );
  }

  getOfertaDescripcion(idOferta: number): string {
    const oferta = this.ofertas.find(o => o.idOferta === idOferta);
    return oferta ? oferta.descripcionOferta : '';
  }

  getTemporadaDescripcion(idTemporada: number): string {
    const temporada = this.temporadas.find(t => t.idTemporada === idTemporada);
    return temporada ? temporada.descripcionTemporada : '';
  }
}
