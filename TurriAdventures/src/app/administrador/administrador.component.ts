import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorService } from '../../Core/AdministradorService';
import { Administrador } from '../../Model/Administrador';
import { SidebarAdministradorComponent } from "../sidebar-administrador/sidebar-administrador.component";
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { LoginService } from '../../Core/LoginService';


@Component({
    selector: 'app-administrador',
    standalone: true,
    templateUrl: './administrador.component.html',
    styleUrl: './administrador.component.css',
    imports: [CommonModule, SidebarAdministradorComponent]
})

export class AdministradorComponent implements OnInit {

    administradores: Administrador[] = [];
    nuevoAdmin: Administrador = { idAdministrador: 0, usuario: '', contrasena: '' };
    administradorSeleccionado: Administrador | null = null;
    mostrarModalEdicion: boolean = false;
    mensaje: string = '';
    esError: boolean = false;

    constructor(
        private administradorService: AdministradorService,
        private router:Router,
        private loginService:LoginService) { }

    ngOnInit(): void {
        this.listarAdministradores();
    }


    listarAdministradores(): void {
        this.administradorService.ListarAdministradores().subscribe(administradores => {
            this.administradores = administradores;
        });
    }

    agregarAdministrador(): void {
        console.log('agregar', this.administradorService.CrearAdministrador(this.nuevoAdmin));
        if (!this.nuevoAdmin.usuario || !this.nuevoAdmin.contrasena) {
            this.mensaje = 'Por favor, complete todos los campos.';
            this.esError = true;
            setTimeout(() => {
                this.mensaje = '';
            }, 3000);
            return;
        }

        this.administradorService.verificarExistenciaUsuario(this.nuevoAdmin.usuario).subscribe(existe => {
            if (existe) {
                this.mensaje = 'El nombre de usuario del administrador ya existe.';
                setTimeout(() => {
                    this.mensaje = '';
                }, 3000);
            } else {
                this.administradorService.CrearAdministrador(this.nuevoAdmin).subscribe(() => {
                    console.log('agregar', this.administradorService.CrearAdministrador(this.nuevoAdmin));
                    this.mensaje = 'El administrador se ha creado con éxito';
                    this.esError = false;
                    this.limpiarCampos();
                    this.listarAdministradores();
                    setTimeout(() => {
                        this.mensaje = '';
                    }, 3000);
                });
            }
        });
    }

    limpiarCampos() {
        this.nuevoAdmin = { idAdministrador: 0, usuario: '', contrasena: '' };
        (document.getElementById('usuario') as HTMLInputElement).value = "";
        (document.getElementById('contrasena') as HTMLInputElement).value = "";
    }

    editarAdministrador(admin: Administrador): void {
        this.administradorSeleccionado = admin;
        this.mostrarModalEdicion = true;

        // Llena los campos del modal
        (document.getElementById('usuarioEdit') as HTMLInputElement).value = this.administradorSeleccionado.usuario;
        (document.getElementById('contrasenaEdit') as HTMLInputElement).value = this.administradorSeleccionado.contrasena;
    }

    cerrarModalEdicion(): void {
        this.mostrarModalEdicion = false;
    }

    guardarEdicion(): void {
        if (this.administradorSeleccionado) {
            // Actualizar los datos del administrador seleccionado
            const usuario = (document.getElementById('usuarioEdit') as HTMLInputElement).value;
            const contrasena = (document.getElementById('contrasenaEdit') as HTMLInputElement).value;
            this.administradorSeleccionado.usuario = usuario;
            this.administradorSeleccionado.contrasena = contrasena;

            this.administradorService.EditarAdministrador(this.administradorSeleccionado).subscribe(() => {
                this.cerrarModalEdicion();
                this.listarAdministradores();

            });
        }
    }

    eliminarAdministrador(id: number): void {
        this.administradorService.EliminarAdministrador(id).subscribe(() => {
            this.listarAdministradores();
        });
    }

    onInputChange(field: 'usuario' | 'contrasena', value: string) {
        if (this.administradorSeleccionado) {
            this.administradorSeleccionado[field] = value;
        } else {
            this.nuevoAdmin[field] = value;
        }
    }


}
