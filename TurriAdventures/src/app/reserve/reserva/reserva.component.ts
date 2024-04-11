import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
    selector: 'app-reserva',
    standalone: true,
    templateUrl: './reserva.component.html',
    styleUrl: './reserva.component.css',
    imports: [SidebarComponent]
})
export class ReservaComponent {

}
