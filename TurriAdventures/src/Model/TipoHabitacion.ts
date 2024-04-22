export interface TipoHabitacion{
    idTipoHabitacion: number,
    nombreTipoHabitacion: String,
    precio: number,
    descripcionTipoHabitacion: String,
    imagenTipoHabitacion: String,
    idOferta: number,
    idTemporada: number
}

export class TipoHabitacion implements TipoHabitacion {
    constructor(
        public idTipoHabitacion: number,
        public nombreTipoHabitacion: String,
        public precio: number,
        public descripcionTipoHabitacion: String,
        public imagenTipoHabitacion: String,
        public idOferta: number,
        public idTemporada: number
    ) {};
}
