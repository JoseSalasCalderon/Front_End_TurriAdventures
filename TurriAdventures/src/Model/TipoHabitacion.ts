export interface TipoHabitacion{
    idTipoHabitacion: number,
    nombreTipoHabitacion: string,
    precio: number,
    descripcionTipoHabitacion: string,
    imagenTipoHabitacion: string,
    idOferta: number,
    idTemporada: number
}

export class TipoHabitacion implements TipoHabitacion {
    tipo: any;
    constructor(
        public idTipoHabitacion: number,
        public nombreTipoHabitacion: string,
        public precio: number,
        public descripcionTipoHabitacion: string,
        public imagenTipoHabitacion: string,
        public idOferta: number,
        public idTemporada: number
    ) {};
}
