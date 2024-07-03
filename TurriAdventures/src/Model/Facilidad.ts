export interface Facilidad{
    idFacilidad: number,
    descripcionFacilidad: string,
    imagenFacilidad: string
}

export class TipoHabitacion implements TipoHabitacion {
    constructor(
        public idFacilidad: number,
        public descripcionFacilidad: string,
        public imagenFacilidad: string
    ) {};
}