export interface Direccion{
    idDireccion: number,
    informacionDireccion: String
}

export class Direccion implements Direccion {
    constructor(
        public idDireccion: number,
        public informacionDireccion: String
    ) {};
}