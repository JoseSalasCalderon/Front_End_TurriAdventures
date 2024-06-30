import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarAdministradorComponent } from '../sidebar-administrador/sidebar-administrador.component';
import { Contact } from '../../Model/Contact';
import { ContactService } from '../../Core/ContactService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-modificar-contact',
  standalone: true,
  imports: [CommonModule,SidebarAdministradorComponent, ReactiveFormsModule],
  templateUrl: './modificar-contact.component.html',
  styleUrl: './modificar-contact.component.css'
})
export class ModificarContactComponent  implements OnInit {
  contactForm: FormGroup;
  contact: Contact | undefined;
  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      telefono1: ['', Validators.required],
      telefono2: ['', Validators.required],
      apartadoPostal: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.obtenerContacto();
  }

  obtenerContacto(): void {
    this.contactService.ListarContactos().subscribe((data: Contact[]) => {
      if (data.length > 0) {
        this.contact = data[0];
        this.contactForm.patchValue(this.contact);
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const modificarContact: Contact = {
        ...this.contact,
        ...this.contactForm.value
      };
      this.contactService.EditarContacto(modificarContact).subscribe(
        response => {
          this.mostrarMensaje('Contacto actualizado.', false);
        },
        error => {
          this.mostrarMensaje('Error al actualizar el contacto.', true);
        }
      );
    }else{
      this.mostrarMensaje('Por favor, complete todos los campos.', true);
    }
  }

  mostrarMensaje(mensaje: string, esError: boolean) {
    this.mensaje = mensaje;
    this.esError = esError;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}
