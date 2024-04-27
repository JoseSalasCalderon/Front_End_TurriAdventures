import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.fechaLlegada = params['fechaLlegada'];
            this.fechaSalida = params['fechaSalida'];
        });
    }
}