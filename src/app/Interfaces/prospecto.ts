import { Binary} from "@angular/compiler"

export interface Prospecto {
    idProspecto:number,
    nombre?: string,
    fachadaimg?:string,
    url?:string,
    direccion?:string,
    contacto?:string,
    razonSocial?:string,
    idauditor?:number,
    detalle?:string,
    esActivo:number

    
}

export class archivo{
    constructor(
      public idProspecto:number,
      public nombre?: string,
      public fachadaimg?:string,
      public url?:string,
      public direccion?:string,
      public contacto?:string,
      public razonSocial?:string,
      public idauditor?:number,
      public detalle?:string,
      public esActivo?:number
    ){}
}
