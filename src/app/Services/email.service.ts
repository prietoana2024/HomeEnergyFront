import { Injectable } from '@angular/core';
import{HttpClient}from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Email } from '../Interfaces/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private urlApi:string = environment.endpoint+"Email/";

  constructor(private http:HttpClient) { }

  enviar(request:Email):Observable<ResponseApi>
    {
      return this.http.post<ResponseApi>(`${this.urlApi}Enviar`,request)
    }}
