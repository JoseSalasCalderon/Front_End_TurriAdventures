export interface Publicidad {
    idPublicidadr: number,
    imagenPublicidad: string,
    linkPublicidad: string
}
export class Publicidad implements Publicidad {
    constructor(
        public idPublicidad: number,
        public imagenPublicidad: string,
        public linkPublicidad: string
    ) {};
}