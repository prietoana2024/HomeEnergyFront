import { Injectable } from '@angular/core';
import{HttpClient}from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Cotizacion } from '../Interfaces/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private urlApi:string = environment.endpoint+"Cotizacion/";

  constructor(private http:HttpClient) { }

  registrar(request:Cotizacion):Observable<ResponseApi>
  {
    return this.http.post<ResponseApi>(`${this.urlApi}Registrar`,request)
  }

  editarCotizacion(request:Cotizacion):Observable<ResponseApi>
  {
    return this.http.put<ResponseApi>(`${this.urlApi}EditarCotizacion`,request)
  }

  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }
  guardar(request:Cotizacion):Observable<ResponseApi>
  {
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`,request)
  }
  editar(request:Cotizacion):Observable<ResponseApi>
  {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`,request)
  }
  eliminar(id:number):Observable<ResponseApi>
  {
    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`)
}

}
