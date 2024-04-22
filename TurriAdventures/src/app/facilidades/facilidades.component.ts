import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FacilidadService } from '../../Core/FacilidadService'; 
import { Facilidad } from '../../Model/Facilidad';
import { ViewEncapsulation } from '@angular/core';

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
        private FacilidadesService: FacilidadService,
        private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.obtenerFacilidades();
    }

    obtenerFacilidades(){
        return this.FacilidadesService.ListarFacilidades().subscribe((data: Facilidad[]) => {
            const facilidades = document.getElementById("all-facilities");

            if (facilidades) {
                facilidades.innerHTML = '';
                for (let index = 0; index < data.length; index++) {
                    facilidades.innerHTML += `
                        <div class="facilities">
                            <img class="facility-image" src="assets\\Facilidades\\${data[index].imagenFacilidad}" alt="">
                            <p>${data[index].descripcionFacilidad}</p>
                        </div>
                    `;
                }
                // Llama a detectChanges después de agregar elementos dinámicamente
                this.cdr.detectChanges();
            }
            console.log(data);
            this.listaFacilidades = data;
        });
    }
}

