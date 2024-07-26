import { Injectable } from '@angular/core';
import{HttpClient}from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Prospecto} from '../Interfaces/prospecto';

@Injectable({
  providedIn: 'root'
})
export class ProspectoService {

  private urlApi:string = environment.endpoint+"Prospecto/";
  constructor(private http:HttpClient) { }

  
  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }
  guardar(request:Prospecto):Observable<ResponseApi>
{
  return this.http.post<ResponseApi>(`${this.urlApi}Guardar`,request)
}
  editar(request:Prospecto):Observable<ResponseApi>
  {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`,request)
  }
  eliminar(id:number):Observable<ResponseApi>
  {
    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`)
  }

guardarImagen(formData:any):Observable<ResponseApi>
{
  return this.http.post<ResponseApi>(`${this.urlApi}GuardarImagen`,formData)
}
/*
GetProspect():Observable<ResponseApi>{
  return this.http.get<ResponseApi>(`${this.urlApi}GetProductwithimage`)
}
GetProspectbycode(code:any):Observable<ResponseApi>{
  return this.http.get<ResponseApi>(`${this.urlApi}GetProductwithimagebycode`+code)
}
*/upload(file:any):Observable<ResponseApi>
{
  return this.http.post<ResponseApi>(`${this.urlApi}upload/`,file)
}
base64(request:any):Observable<ResponseApi>
{
    return this.http.get<ResponseApi>(`${this.urlApi}upload${request}`) 
}/*
UploadImage(inputData:any):Observable<ResponseApi>
{
    return this.http.post<ResponseApi>(`${this.urlApi}UploadImage`,inputData);
}*/
RemoveImage(code:any):Observable<ResponseApi>
{
    return this.http.get<ResponseApi>(`${this.urlApi}RemoveImage`+code) 
}
}

