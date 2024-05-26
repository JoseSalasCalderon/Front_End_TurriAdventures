export interface Home {
    idHome: number,
    imagenHome: string,
    descripcionHome: string
}
export class Publicidad implements Publicidad {
    constructor(
        public idPublicidad: number,
        public imagenPublicidad: string,
        public descripcionPublicidad: string
    ) {};
}