import { Injectable } from '@angular/core';
import{HttpClient}from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { ClienteUsuario } from '../Interfaces/cliente-usuario';
import { ClienteUsuarioAsignado } from '../Interfaces/cliente-usuario-asignado';

@Injectable({
  providedIn: 'root'
})
export class ClienteUsuarioService {

  private urlApi:string = environment.endpoint+"ClienteUsuario/";

  constructor(
    private http:HttpClient

  ) { }

  lista(idUsuario:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista?idUsuario=${idUsuario}`)
  }

  reporte():Observable<ResponseApi>
  {
    return this.http.get<ResponseApi>(`${this.urlApi}Reporte`)
  }
  ReporteUsuario(nombreUsuario:string){
    return this.http.get<ResponseApi>(`${this.urlApi}ReporteUsuario?nombreUsuario=${nombreUsuario}`)
  }
  guardar(request:ClienteUsuario):Observable<ResponseApi>
{
  return this.http.post<ResponseApi>(`${this.urlApi}Guardar`,request)
}
}
