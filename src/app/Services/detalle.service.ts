import { Injectable } from '@angular/core';
import{HttpClient}from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { DetalleVenta } from '../Interfaces/detalle-venta';


@Injectable({
  providedIn: 'root'
})
export class ProspectoDetalleService {
  private urlApi:string = environment.endpoint+"Detalle/";
  constructor(private http:HttpClient) { }

  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }
}
