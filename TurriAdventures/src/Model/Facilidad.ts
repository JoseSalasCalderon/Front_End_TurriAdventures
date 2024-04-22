export interface Facilidad{
    idFacilidad: number,
    descripcionFacilidad: String,
    imagenFacilidad: String
}

export class TipoHabitacion implements TipoHabitacion {
    constructor(
        public idFacilidad: number,
        public descripcionFacilidad: String,
        public imagenFacilidad: String
    ) {};
}