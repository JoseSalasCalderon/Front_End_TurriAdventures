import { Component, OnInit } from '@angular/core';
import { Temporada } from '../../Model/Temporada';
import { TemporadaService } from '../../Core/TemporadaService';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-listar-temporadas',
  standalone: true,
  imports: [CommonModule,SidebarAdministradorComponent,HeaderComponent,FooterComponent,RouterModule],
  templateUrl: './listar-temporadas.component.html',
  styleUrl: './listar-temporadas.component.css'
})
export class ListarTemporadasComponent implements OnInit {


  TemporadaPorPagina: number = 3; 
  paginaActual: number = 1;
  listaEstados: Temporada[] = [];

  constructor(private temporadaService: TemporadaService) { }

  ngOnInit(): void {
    this.obtenerEstados();
  }

  obtenerEstados() {
    const inicio = (this.paginaActual - 1) * this.TemporadaPorPagina;
    const fin = this.paginaActual * this.TemporadaPorPagina;
    this.temporadaService.ListarTemporadas().subscribe((data: Temporada[]) => {
      this.listaEstados = data.slice(inicio, fin); 
    });
  }

  
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.obtenerEstados();
  }




}
