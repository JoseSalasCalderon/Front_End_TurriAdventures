import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { DatosCompartidosService } from '../DatosCompartidosService';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../Core/ClienteService';
import { Cliente } from '../../../Model/Cliente';
import { ReservationService } from '../../../Core/ReservaService';
import { Reserva } from '../../../Model/Reserva';


@Component({
    selector: 'app-reserva',
    standalone: true,
    templateUrl: './reserva.component.html',
    styleUrl: './reserva.component.css',
    imports: [SidebarComponent]
})
export class ReservaComponent implements OnInit {
    datosCliente: { idCliente: string, nombre: string, apellidos: string, email: string, tarjetaCredito: string, vencimiento: string } = { idCliente: '', nombre: '', apellidos: '', email: '', tarjetaCredito: '', vencimiento: '' };
    datosReserve: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: number } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: 0 };
    tarjetaValida: boolean = true;
    cliente: Cliente = new Cliente("", "", "", "");
    datosReserva: any;
    habitacionId: any;

    constructor(
        private datosCompartidosService: DatosCompartidosService,
        private ClienteService: ClienteService,
        private router: Router,
        private reservaService: ReservationService,
        private route: ActivatedRoute


    ) { }

    ngOnInit(): void {
        this.datosReserve = this.datosCompartidosService.getDatosReserve();
        this.route.queryParams.subscribe(params => {
            this.datosReserva = params;
            this.habitacionId = params['habitacionId']; // Obtener el ID de la habitación
            console.log('Habitación ID:', this.habitacionId);

        });
    }


    monto(): number {
        let fechaLlegada = new Date(this.datosReserve.fechaLlegada);
        let fechaSalida = new Date(this.datosReserve.fechaSalida);
        let total: number = 0;
        let dias = Math.ceil((fechaSalida.getTime() - fechaLlegada.getTime()) / (1000 * 60 * 60 * 24));


        switch (this.datosReserve.tipoHabitacion) {
            case 1:
                total = dias * 150;
                break;
            case 2:
                total = dias * 100;
                break;
            case 3:
                total = dias * 200;
                break;
            default:
                break;
        }

        return total;
    }


    onInputChange(field: 'nombre' | 'apellidos' | 'email' | 'tarjetaCredito' | 'idCliente', value: string) {
        this.datosCliente[field] = value;
        if (field === 'tarjetaCredito') {
            this.validarTarjeta();
        } else if (field === 'idCliente') {
            //Agregar el campo de Cedula para que se cargue todo automáticamente
            this.obtenerDatosCliente(value.trim());
        }

        this.datosCompartidosService.setDatosCliente(this.datosCliente);
    }

    async onSubmit() {
        if (true) {
            const nuevoCliente: Cliente = {
                idCliente: this.datosCliente.idCliente,
                nombre: this.datosCliente.nombre,
                apellidos: this.datosCliente.apellidos,
                email: this.datosCliente.email
            };
            //await this.ClienteService.CrearCliente(nuevoCliente).toPromise();
            console.log('datos de reseva para crear', this.datosReserva);
            const reserva: Reserva = {
                idCliente: nuevoCliente.idCliente,
                fechaLlegada: new Date(this.datosReserva.fechaLlegada),
                fechaSalida: new Date(this.datosReserva.fechaSalida),
                estadoReservacion: "Pendiente",
                idHabitacion: this.habitacionId, // Asigna el id de la habitación disponible
                idReservacion: 0
            };
            console.log('datos de reserva', reserva);
             await this.reservaService.CrearReserva(reserva).toPromise();
         //   this.router.navigate(['/confirmReserve'], { queryParams: { idHabitacion: this.habitacionId, } });

            this.router.navigate(['/confirmReserve']);



        }
        else {
            alert('Por favor revisar que los datos ingresados sean validos y completos'); //cambiar por modal o un mensaje mas bonito
        }
    }




    camposValidos(): boolean {
        return !!this.datosCliente.nombre && !!this.datosCliente.apellidos && !!this.datosCliente.email && !!this.datosCliente.idCliente;
    }

    cancel() {
        this.router.navigate(['/reserve']);
    }

    validarTarjeta(): void {
        let numero = this.datosCliente.tarjetaCredito.replace(/\s/g, '').replace(/-/g, '');
        if (!/^\d + $ /.test(numero) || numero.length < 1) {
            this.tarjetaValida = false;
            return;
        }

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
            this.ClienteService.BuscarCliente(idCliente).subscribe((data: Cliente) => {
                if (data != null) {
                    this.cliente = data;
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

}
