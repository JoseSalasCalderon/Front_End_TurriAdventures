export interface Habitacion{
    idHabitacion: number,
    estadoHabitacion: number,
    numeroHabitacion: number,
    capacidadMaxima: number,
    idTipoHabitacion: number,
}

export class Habitacion implements Habitacion {
    constructor(
        public idHabitacion: number,
        public estadoHabitacion: number,
        public numeroHabitacion: number,
        public capacidadMaxima: number,
        public idTipoHabitacion: number
    ) {}
}