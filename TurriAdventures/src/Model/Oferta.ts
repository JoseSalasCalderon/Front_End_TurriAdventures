export interface Oferta{
    idOferta:number,
    descripcionOferta:string,
    fechaInicioOferta: Date,
    fechaFinalOferta: Date,
    precioOferta: number,
}

export class Oferta implements Oferta {

    constructor(public  idOferta:number, public descripcionOferta:string,public fechaInicioOferta: Date,public fechaFinalOferta: Date, public  precioOferta: number) {
    };
  
  }