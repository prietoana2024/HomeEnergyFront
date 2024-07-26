import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { archivo } from '../Interfaces/prospecto';
import { StringOrNumberOrDate } from '@swimlane/ngx-charts';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Imagen } from '../Interfaces/imagen';
@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private urlApi:string = environment.endpoint+"Prospecto/";
  public url:String;

  private baseUrl='http://localhost:5167/api/'

  constructor(
    private http: HttpClient
  ) 
  { 
    this.url=this.baseUrl;
  }
  add(data:Imagen){
    let formData = new FormData();
    formData.append("nombre",data.nombre);
    formData.append("imageFile",data.imageFile??"");
    return this.http.post<ResponseApi>('http://localhost:58372/api/FileManager/Agregar',formData);
  }
  uploadFile(File):Observable<any>{
    var json=JSON.stringify(File);
    console.log(File);
    var headers=new HttpHeaders().set("Content-Type","application/json");
    return this.http.post<ResponseApi>(`${this.urlApi}insertarImagen/`,File,{headers});
  }

  getUploads():Observable<any>{
    var json=JSON.stringify(File);
    console.log(File);
    var headers=new HttpHeaders().set("Content-Type","application/json");
    return this.http.get<ResponseApi>(`${this.urlApi}imagenesSubidas/`);
  }

}

