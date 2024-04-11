import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { HeaderComponent } from "../../header/header.component";

@Component({
    selector: 'app-reserve',
    standalone: true,
    templateUrl: './reserve.component.html',
    styleUrl: './reserve.component.css',
    imports: [SidebarComponent, HeaderComponent]
})
export class ReserveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
