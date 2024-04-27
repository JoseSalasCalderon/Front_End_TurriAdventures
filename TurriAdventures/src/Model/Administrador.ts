export interface Administrador {
    idAdministrador: number,
    usuario: string,
    contrasena: string
}
export class Administrador implements Administrador {
    constructor(
        public idAdministrador: number,
        public usuario: string,
        public contrasena: string
    ) {};
}