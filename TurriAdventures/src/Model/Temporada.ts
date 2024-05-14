export interface Temporada{
    idTemporada:number,
    descripcionTemporada:string,
    fechaInicioTemporada: Date,
    fechaFinalTemporada: Date,
    precioTemporada: number,
}

export class Temporada implements Temporada {

    constructor(public  idTemporada:number, public descripcionTemporada:string,public fechaInicioTemporada: Date,public fechaFinalTemporada: Date, public  precioTemporada: number) {
    };
  
  }