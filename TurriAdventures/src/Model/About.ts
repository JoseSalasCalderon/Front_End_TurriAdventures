export interface About{
    idNosotros: number,
    descripcionNosotros: string,
    imagenNosotros: string
}

export class About implements About {
    constructor(
        public idNosotros: number,
        public descripcionNosotros: string,
        public imagenNosotros: string
    ) {};
}