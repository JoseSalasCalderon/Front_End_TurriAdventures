export interface Login{
    Usuario:String
    Contrasena:String
}


export class Login implements Login {
    constructor(
        public Usuario: String,
        public Contrasena: String
    ) {}
}