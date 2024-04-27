import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { ViewEncapsulation } from '@angular/core';
import { ContactService } from '../../Core/ContactService';
import { Contact } from '../../Model/Contact';
@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
    encapsulation: ViewEncapsulation.None,
    imports: [SidebarComponent, HeaderComponent]
})
export class ContactComponent implements OnInit{
    telefono1: string = '';
    telefono2: string = '';
    apartadoPostal: string= '';
    email: string= '';
    constructor(private contactService: ContactService) {}

    ngOnInit(): void {
    this.obtenerContacto();
    }

    obtenerContacto(): void {
        this.contactService.ListarContactos().subscribe((data: Contact[]) => {
          if (data.length > 0) {
            this.telefono1 = data[0].telefono1;
            this.telefono2 = data[0].telefono2
            this.apartadoPostal = data[0].apartadoPostal;
            this.email = data[0].email;
          }
        });
      }
}
