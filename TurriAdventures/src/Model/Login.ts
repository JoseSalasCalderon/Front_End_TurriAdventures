export interface Login{
    ID: number;
    usuario:string
    contrasena:string
}


export class Login implements Login {
    constructor(
        public ID: number,
        public usuario: string,
        public contrasena: string
    ) {}
}