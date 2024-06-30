import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FacilidadService } from '../../Core/FacilidadService'; 
import { Facilidad } from '../../Model/Facilidad';
import { ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-facilidades',
    standalone: true,
    templateUrl: './facilidades.component.html',
    styleUrl: './facilidades.component.css',
    //Esto es necesario para que se aplique el css con html dinámico
    encapsulation: ViewEncapsulation.None,
    imports: [HeaderComponent, SidebarComponent]
})
export class FacilidadesComponent implements OnInit{

    listaFacilidades: Facilidad[] = [];

    constructor(
        private FacilidadesService: FacilidadService
    ) { }

    ngOnInit(): void {
        this.obtenerFacilidades();
    }

    obtenerFacilidades(){
        return this.FacilidadesService.ListarFacilidades().subscribe({
            next: (data: Facilidad[]) => {
                const facilidades = document.getElementById("all-facilities");
                const errorMessage = document.getElementById("error-message");

                if (facilidades) {
                    facilidades.innerHTML = '';
                    if (data.length === 0) {
                        if (errorMessage) {
                            errorMessage.style.display = 'block';
                            errorMessage.innerHTML = '<div class="alert alert-warning" role="alert">No hay facilidades disponibles.</div>';
                        }
                    } else {
                        if (errorMessage) {
                            errorMessage.style.display = 'none';
                        }
                        for (let index = 0; index < data.length; index++) {
                            facilidades.innerHTML += `
                                <div class="facilities">
                                    <img class="facility-image" src="assets\\Facilidades\\${data[index].imagenFacilidad}" alt="">
                                    <p>${data[index].descripcionFacilidad}</p>
                                </div>
                            `;
                        }
                    }
                }
                this.listaFacilidades = data;
            },
            error: (error: HttpErrorResponse) => {
                const errorMessage = document.getElementById("error-message");
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.innerHTML = '<div class="alert alert-danger" role="alert">Error al obtener facilidades. Intente nuevamente más tarde.</div>';
                }
                console.error('ERROR', error);
            }
        });
    }
}

