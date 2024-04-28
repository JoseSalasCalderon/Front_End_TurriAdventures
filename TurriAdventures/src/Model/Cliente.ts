export interface Cliente{
    idCliente: string,
    nombre: string,
    apellidos: string,
    email: string
}

export class Cliente implements Cliente {
    constructor(
        public idCliente: string,
        public nombre: string,
        public apellidos: string,
        public email: string
    ) {}
}