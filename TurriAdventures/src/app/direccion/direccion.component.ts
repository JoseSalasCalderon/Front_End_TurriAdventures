import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-direccion',
    standalone: true,
    templateUrl: './direccion.component.html',
    styleUrl: './direccion.component.css',
    imports: [SidebarComponent, HeaderComponent]
})
export class DireccionComponent {

}
