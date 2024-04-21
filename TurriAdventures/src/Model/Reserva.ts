export interface Reserva{
    idReservacion:number,
    fechaLlegada: Date,
    fechaSalida: Date,
    estadoReservacion: String,
    idHabitacion: number,
    idCliente: String,
}

export class Reserva implements Reserva {

    constructor(public  idReservacion:number,public fechaLlegada: Date,public fechaSalida: Date, public estadoReservacion: String, 
        public idHabitacion: number, public idCliente: String ) {
    };
  
  }