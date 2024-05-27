export interface Publicidad {
    idPublicidad: number,
    imagenPublicidad: string,
    linkPublicidad: string
    nombrePublicidad: string
}
export class Publicidad implements Publicidad {
    constructor(
        public idPublicidad: number,
        public imagenPublicidad: string,
        public linkPublicidad: string,
        public nombrePublicidad: string
    ) {};
}