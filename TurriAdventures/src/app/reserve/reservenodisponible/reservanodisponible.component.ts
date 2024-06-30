import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatosCompartidosService } from '../DatosCompartidosService';

@Component({
    selector: 'app-reservanodisponible',
    standalone: true,
    templateUrl: './reservanodisponible.component.html',
    styleUrl: './reservanodisponible.component.css',
    imports: [SidebarComponent]
})
export class ReservanodisponibleComponent implements OnInit {
    fechaLlegada: string = '';
    fechaSalida: string = '';
    datosReserve: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: 0 };
    nombreTipoRecomendado: string = '';
    tipoRecomendado: string = '';
    constructor(
        private route: ActivatedRoute,
        private datosCompartidosService: DatosCompartidosService

    ) { }

    ngOnInit(): void {
        this.datosReserve = this.datosCompartidosService.getDatosReserve();
        this.route.queryParams.subscribe(params => {
            this.fechaLlegada = params['fechaLlegada'];
            this.fechaSalida = params['fechaSalida'];
        });
        this.recomendacion();
    }

    recomendacion() {
        if (this.datosReserve.tipoHabitacion == 1) {
            this.nombreTipoRecomendado = 'Habitación Doble';
            this.tipoRecomendado = '3';
        } else if (this.datosReserve.tipoHabitacion == 2) {
            this.nombreTipoRecomendado = 'Habitación Doble';
            this.tipoRecomendado = '3';

        } else if (this.datosReserve.tipoHabitacion == 3) {
            this.nombreTipoRecomendado = 'Suite Ejecutiva';
            this.tipoRecomendado = '1';
        }
    }//recomendacion

}