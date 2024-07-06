
import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { DatosCompartidosService } from '../DatosCompartidosService';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../Model/Cliente';
import { ReservationService } from '../../../Core/ReservaService';
import { Reserva } from '../../../Model/Reserva';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../Core/ClienteService';
import { TipoHabitacionService } from '../../../Core/TipoHabitacionService';
import { TipoHabitacion } from '../../../Model/TipoHabitacion';

@Component({
    selector: 'app-reserva',
    standalone: true,
    templateUrl: './reserva.component.html',
    styleUrl: './reserva.component.css',
    imports: [CommonModule, SidebarComponent]
})
export class ReservaComponent  implements OnInit {
    datosCliente: { idCliente: string, nombre: string, apellidos: string, email: string, tarjetaCredito: string, vencimiento: string, cvv: string } = { idCliente: '', nombre: '', apellidos: '', email: '', tarjetaCredito: '', vencimiento: '', cvv: '' };
    datosReserve: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: 0 };
    tarjetaValida: boolean = true;
    cliente: Cliente = new Cliente("", "", "", "");
    datosReserva: any;
    habitacionId: any;
    datosIngresados: boolean = false;
    mensaje: string = '';
    esError: boolean = false;
    nombre: string = '';
    habitacion: TipoHabitacion | null = null;
    imagen: any;

    constructor(
        private datosCompartidosService: DatosCompartidosService,
        private clienteService: ClienteService,
        private router: Router,
        private reservaService: ReservationService,
        private route: ActivatedRoute,
        private tipoHabitacionService: TipoHabitacionService
    ) {}

    ngOnInit(): void {
        this.datosReserve = this.datosCompartidosService.getDatosReserve();
        this.route.queryParams.subscribe(params => {
            this.datosReserva = params;
            this.habitacionId = params['habitacionId']; // Obtener el id de la habitación
    
            // Obtener detalles del tipo de habitación
            this.tipoHabitacionService.BuscarTipoHabitacionPorIdDescuento(Number(this.datosReserve.tipoHabitacion))
                .subscribe(habitacion => {
                    this.habitacion = habitacion;
                    this.nombre = habitacion.nombre;
                    this.imagen = habitacion.imagenTipoHabitacion;
                });
        });
    
        this.datosIngresados = true;
    }

    monto(): number {
        if (!this.habitacion) return 0;
    
        let fechaLlegada = new Date(this.datosReserve.fechaLlegada);
        let fechaSalida = new Date(this.datosReserve.fechaSalida);
        let dias = Math.ceil((fechaSalida.getTime() - fechaLlegada.getTime()) / (1000 * 60 * 60 * 24));
    
        return dias * this.habitacion.precio;
    }
    

    onInputChange(field: 'nombre' | 'apellidos' | 'email' | 'tarjetaCredito' | 'idCliente' | 'cvv', value: string) {
        this.datosIngresados = true;
        this.datosCliente[field] = value;

        if (field === 'idCliente') {
            if (!this.validarCedula(value)) {
                this.mensaje = 'La cédula solo debe contener números.';
                this.esError = true;
                setTimeout(() => { this.mensaje = ''; this.esError = false; }, 3000);
                return;
            } else {
                this.obtenerDatosCliente(value.trim());
            }
        }

        if (field === 'nombre' || field === 'apellidos') {
            if (!this.validarNombre(value)) {
                this.mensaje = 'El nombre y los apellidos no deben contener números o símbolos.';
                this.esError = true;
                setTimeout(() => { this.mensaje = ''; this.esError = false; }, 3000);
                return;
            }
        }

        if (field === 'tarjetaCredito') {
            if (!this.validarSoloNumeros(value)) {
                this.mensaje = 'La tarjeta de crédito solo debe contener números.';
                this.esError = true;
                setTimeout(() => { this.mensaje = ''; this.esError = false; }, 3000);
                return;
            } else {
                this.validarTarjeta();
            }
        }

        this.datosCompartidosService.setDatosCliente(this.datosCliente);
    }

    validarCedula(value: string): boolean {
        return /^\d+$/.test(value);
    }
    validarNombre(value: string): boolean {
        return !/\d/.test(value);
    }
    validarSoloNumeros(value: string): boolean {
        return /^\d+$/.test(value);
    }

    async onSubmit() {
        if (this.camposValidos() && this.isValidExpiryDate('vencimiento', this.datosCliente.vencimiento)) {
            const nuevoCliente: Cliente = {
                idCliente: this.datosCliente.idCliente,
                nombre: this.datosCliente.nombre,
                apellidos: this.datosCliente.apellidos,
                email: this.datosCliente.email
            };
            await this.clienteService.CrearCliente(nuevoCliente).toPromise();
            const reserva: Reserva = {
                idCliente: nuevoCliente.idCliente,
                fechaLlegada: new Date(this.datosReserva.fechaLlegada),
                fechaSalida: new Date(this.datosReserva.fechaSalida),
                estadoReservacion: "Pendiente",
                idHabitacion: this.habitacionId, // Asigna el id de la habitación disponible
                idReservacion: 0
            };
            await this.reservaService.CrearReserva(reserva).toPromise();
            this.router.navigate(['/confirmReserve']);

         
        }
        else {
            this.mensaje = 'Por favor revisa que los datos ingresados sean válidos y completos.';
            this.esError = true;
            setTimeout(() => {
                this.mensaje = '';
            }, 3000);
            return;
        }
    }

    camposValidos(): boolean {
        return !!this.datosReserve.fechaLlegada && !!this.datosReserve.fechaSalida &&
            !!this.datosReserve.tipoHabitacion && !!this.datosCliente.cvv && this.datosCliente.cvv.length === 3
            && !!this.datosCliente.idCliente && !!this.datosCliente.nombre && !!this.datosCliente.apellidos
            && !!this.datosCliente.email && !!this.datosCliente.tarjetaCredito &&
            !!this.datosCliente.vencimiento && this.tarjetaValida;

    }

   cancel() {
    const confirmCancel = window.confirm('¿Está seguro que desea cancelar porque se perderán todos los datos');
    if (confirmCancel) {
        this.router.navigate(['/reserve']);
    }
}

    validarTarjeta(): void {
        let numero = this.datosCliente.tarjetaCredito.replace(/\s/g, '').replace(/-/g, '');
        /* 
         if (!/^\d + $ /.test(numero) || numero.length < 1) {
             this.tarjetaValida = false;
             return;
         }
 */
        let suma = 0;
        let longitud = numero.length;
        let paridad = longitud % 2;

        for (let i = 0; i < longitud; i++) {
            let digito = parseInt(numero.charAt(i), 10);

            if (i % 2 === paridad) {
                digito *= 2;
                if (digito > 9) {
                    digito -= 9;
                }
            }

            suma += digito;
        }
        this.tarjetaValida = suma % 10 === 0;
    }

    isValidExpiryDate(field: 'vencimiento', value: string): boolean {
        this.datosCliente[field] = value;

        const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

        if (!pattern.test(this.datosCliente.vencimiento)) {
            return false;
        }

        const fechaActual = new Date();
        const [mesVencimiento, anioVencimiento] = this.datosCliente.vencimiento.split('/').map(Number);
        const fechaVencimiento = new Date(2000 + anioVencimiento, mesVencimiento - 1, 1);
        return fechaVencimiento >= fechaActual;
    }

    obtenerDatosCliente(idCliente: String) {
        this.limpiarCamposCliente();
        if (idCliente != '') {
            this.clienteService.BuscarCliente(idCliente).subscribe((data: Cliente) => {
                if (data != null) {
                    this.cliente = data;
                    this.datosCliente.nombre = this.cliente.nombre;
                    this.datosCliente.apellidos = this.cliente.apellidos;
                    this.datosCliente.email = this.cliente.email;
                }
            });
        };
    }


    limpiarCamposCliente() {
        const nombre = document.getElementById("nombre") as HTMLInputElement;
        const apellidos = document.getElementById("apellidos") as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const tarjetaCredito = document.getElementById("tarjetaCredito") as HTMLInputElement;
        const vencimiento = document.getElementById("vencimiento") as HTMLInputElement;
        const cvv = document.getElementById("cvv") as HTMLInputElement;

        if (nombre && apellidos && email && tarjetaCredito && vencimiento && cvv) {
            nombre.value = '';
            apellidos.value = '';
            email.value = '';
            tarjetaCredito.value = '';
            vencimiento.value = '';
            cvv.value = '';
        }
    }

    @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) { //Para mostrar mensaje si se intenta salir o actualizar de la pagina
        if (this.datosIngresados) {
            $event.returnValue = true;
            return 'Si actualiza la pagina o se sale perderá todos los datos ingresados.';
        }
        return null;
    }

}