import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-facilidades',
    standalone: true,
    templateUrl: './facilidades.component.html',
    styleUrl: './facilidades.component.css',
    imports: [HeaderComponent, SidebarComponent]
})
export class FacilidadesComponent {

}
