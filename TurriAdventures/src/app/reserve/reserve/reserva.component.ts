import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { DatosCompartidosService } from '../DatosCompartidosService';

import { Router } from '@angular/router';


@Component({
    selector: 'app-reserva',
    standalone: true,
    templateUrl: './reserva.component.html',
    styleUrl: './reserva.component.css',
    imports: [SidebarComponent]
})
export class ReservaComponent implements OnInit {
    datosReservaClient: { idCliente: string, tarjetaCredito: string } = { idCliente: '', tarjetaCredito: '' };
    datos: { idCliente: string, nombre: string, apellidos: string, email: string, tarjetaCredito: string } = { idCliente: '', nombre: '', apellidos: '', email: '', tarjetaCredito: '' };
    datosReserve: { fechaLlegada: string, fechaSalida: string, tipoHabitacion: string } = { fechaLlegada: '', fechaSalida: '', tipoHabitacion: '' };

    constructor(
        private datosCompartidosService: DatosCompartidosService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.datosReserve = this.datosCompartidosService.getDatosReserve();
    }

    monto(): number {
        let total: number = 0;

        if (this.datosReserve.tipoHabitacion == 'doble') {
            total = 150;
        }
        if (this.datosReserve.tipoHabitacion == 'estandar') {
            total = 100;
        }
        if (this.datosReserve.tipoHabitacion == 'ejecutiva') {
            total = 200;
        }
        return total;
    }

    onInputChange(field: 'nombre' | 'apellidos' | 'email', value: string) {
        this.datos[field] = value;
        this.datosCompartidosService.setDatosReserva(this.datos);
    }

    onSubmit() {
        if (this.camposValidos()) {
            this.router.navigate(['/confirmReserve']);
        }
    }

    camposValidos(): boolean {
        return !!this.datos.nombre && !!this.datos.apellidos && !!this.datos.email;
    }

    prueba() {
        this.router.navigate(['/home']);
    }

    validarTarjeta(): boolean {
        this.datosReservaClient.tarjetaCredito = this.datosReservaClient.tarjetaCredito.replace(/\s/g, '').replace(/-/g, '');

        if (!/^\d+$/.test(this.datosReservaClient.tarjetaCredito) || this.datosReservaClient.tarjetaCredito.length < 1) {
            return false;
        }

        var suma = 0;
        var longitud = this.datosReservaClient.tarjetaCredito.length;
        var paridad = longitud % 2;

        for (var i = 0; i < longitud; i++) {
            var digito = parseInt(this.datosReservaClient.tarjetaCredito.charAt(i));

            if (i % 2 === paridad) {
                digito *= 2;
                if (digito > 9) {
                    digito -= 9;
                }
            }

            suma += digito;
        }
    console.log('suma', suma % 10 === 0);
        return suma % 10 === 0;
    }

}



/*tarjetaCredito: string = '';
  enviarFormulario() {
  }
    isValidWithLuhnAlgorithm(tarjetaCredito: string) : boolean {
      // Validar el número de tarjeta utilizando el algoritmo de Luhn
      function validarTarjeta(numero) {
          // Eliminar espacios en blanco y guiones del número de tarjeta
          numero = numero.replace(/\s/g, '').replace(/-/g, '');
  
          if (!/^\d+$/.test(numero) || numero.length < 1) {
              return false;
          }
  
          var suma = 0;
          var longitud = numero.length;
          var paridad = longitud % 2;
  
          for (var i = 0; i < longitud; i++) {
              var digito = parseInt(numero.charAt(i));
  
              if (i % 2 === paridad) {
                  digito *= 2;
                  if (digito > 9) {
                      digito -= 9;
                  }
              }
  
              suma += digito;
          }
  
          return suma % 10 === 0;
      }
  
      // Utilizar la función validarTarjeta para validar el número de tarjeta
      return validarTarjeta(tarjetaCredito);
  }
}

class PaymentProcessor {
  validatePayment(tarjetaCredito: string) {
      const isValidCard = isValidWithLuhnAlgorithm(tarjetaCredito);

      const errors = {};
      if (!isValidCard) {
          errors['tarjetaCredito'] = 'Número de tarjeta inválido';
      }

      return {
          isValid: isValidCard,
          errors: errors
      };
  }
  */
