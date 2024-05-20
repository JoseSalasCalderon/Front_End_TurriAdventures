import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { MapComponent } from '../map/map.component';
import { DireccionService } from '../../Core/DireccionService';
import { Direccion } from '../../Model/Direccion';

@Component({
    selector: 'app-direccion',
    standalone: true,
    templateUrl: './direccion.component.html',
    styleUrl: './direccion.component.css',
    imports: [SidebarComponent, HeaderComponent, MapComponent]
})
export class DireccionComponent implements OnInit{

    direccion: Direccion | null = null;

    constructor(
        private DireccionesService: DireccionService
    ) { }

    ngOnInit(): void {
        this.obtenerDireccion();
    }

    obtenerDireccion() {
        return this.DireccionesService.BuscarHabitacionPorIdReserva(1).subscribe((direccion: Direccion) => {
            this.direccion = direccion;
        });
    }
}
