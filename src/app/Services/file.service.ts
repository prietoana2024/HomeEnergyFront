import { Injectable } from '@angular/core';
import{HttpClient}from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Servicio } from '../Interfaces/servicio';
import { FileData } from '../Interfaces/file-data';
import { request } from 'express';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private urlApi:string = environment.endpoint+"FileManager/";
  constructor(private http:HttpClient) { }
  

  GetAllFile():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}GetAllFile`)
  }/*
  downloadFile(id: number, contentType: string)
  {
    //return this.http.get(`http://localhost:48608/FileManager/${id}`, {responseType: 'blob'})
    .subscribe((result: Blob) => {
      const blob = new Blob([result], { type: contentType }); // you can change the type
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      console.log("Success");
      return this.http.delete<ResponseApi>(`${this.urlApi}Download/${id}`, {responseType: 'blob'})
  });
  }*/
  //LOS NATURALES
  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }
  guardar(request:Servicio):Observable<ResponseApi>
  {
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`,request)
  }
  editar(request:Servicio):Observable<ResponseApi>
  {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`,request)
  }
  eliminar(id:number):Observable<ResponseApi>
  {
    return this.http.delete<ResponseApi>(`http://localhost:58372/api/FileManager/Eliminar/${id}`)
  }
  /*download(id:number):Observable<ResponseApi>
  {
    return this.http.delete<ResponseApi>(`http://localhost:58372/api/FileManager/Download/${id}`)
  }*//*
  downloadFile(id: number)
  {
    return this.http.delete(`http://localhost:58372/api/FileManager/Download/${id}`,request)
  }
  */
  /*
  eliminar(id:number){
    return this.http.post<ResponseApi>('http://localhost:58372/api/FileManager/DeletePrueba',formData);
  }*/

}
