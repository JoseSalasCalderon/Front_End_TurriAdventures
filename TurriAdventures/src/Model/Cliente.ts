export interface Cliente{
    idCliente: number,
    nombre: string,
    apellidos: string,
    email: string
}

export class Cliente implements Cliente {
    constructor(
        public idCliente: number,
        public nombre: string,
        public apellidos: string,
        public email: string
    ) {}
}