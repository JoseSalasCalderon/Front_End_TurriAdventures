export interface Contact{
    idContacto: number,
    telefono1: string,
    telefono2: string,
    apartadoPostal: string,
    email: string,

}

export class Contact implements Contact {
    constructor(
        public idContacto: number,
        public telefono1: string,
        public telefono2: string,
        public apartadoPostal: string,
        public email: string

    ) {};
}