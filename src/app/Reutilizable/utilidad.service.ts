import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../Interfaces/sesion';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Usuario } from 'src/app/Interfaces/usuario';

import { Rol } from 'src/app/Interfaces/rol';

import { RolService } from 'src/app/Services/rol.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {
  listaRoles:Rol[]=[];
  datosUsuario:Usuario[]=[];
  usuarioEncontrado:any;

formularioUsuario:FormGroup;

  constructor(
    private _snackBar:MatSnackBar,
    private _usuarioServicio:UsuarioService,
    private _rolServicio:RolService,
    private fb:FormBuilder
  ) { 
   
    this._rolServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)
        this.listaRoles=data.value;
      },
      error:(e)=>{}
    })

    
    this._usuarioServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)
        this.datosUsuario=data.value
      },
      error:(e)=>{}
    })

    
    this.formularioUsuario=this.fb.group({

      idUsuario:[,Validators.required],
      nombreCompleto:['',Validators.required],
      correo:['',Validators.required],
      idRol:['',Validators.required],
      clave:['',Validators.required],
      esActivo:['1',Validators.required]

    })
  }

  mostrarAlerta(mensaje:string,tipo:string){
    this._snackBar.open(mensaje,tipo,{
    horizontalPosition:"end",
    verticalPosition:"top",
    duration:3000
    })
  }
  guardarSesionUsuario(UsuarioSesion:Sesion){
    localStorage.setItem("usuario",JSON.stringify(UsuarioSesion));

  this._usuarioServicio.editarActivo(UsuarioSesion.idUsuario).subscribe({
    next:(data)=>{
      if(data.status){
        console.log("EXITO");
      }else
      console.log("FALLIDO");
    },
    error:(e)=>{}
  })
  }

  obtenerSesionUsuario(){
    const dataCadena=localStorage.getItem("usuario");
    const usuario=JSON.parse(dataCadena!);
    return usuario;
  }

eliminarSesionUsuario(){
  localStorage.removeItem("usuario");
}

}

