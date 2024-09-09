import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/Interfaces/menu';

import { MenuService } from 'src/app/Services/menu.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { UsuarioService } from 'src/app/Services/usuario.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
  
})

export class LayoutComponent implements OnInit {

  listaMenus:Menu[]=[];
  correoUsuario:string='';
  rolUsuario:string='';
  rolId:number;
  idUsuario:number;

  constructor(

    private router:Router,
    private _menuServicio:MenuService,
    private _utilidadServicio:UtilidadService,
    private _usuarioServicio:UsuarioService

  ) { }

  ngOnInit(): void {
    const usuario=this._utilidadServicio.obtenerSesionUsuario();

    this.idUsuario=usuario.idUsuario;

    if(usuario!=null){
      this.correoUsuario=usuario.correo;
      this.rolUsuario=usuario.rolDescripcion;
      console.log(this.rolUsuario);
      this._menuServicio.lista(usuario.idUsuario).subscribe({
        next:(data)=>{
          if(data.status)this.listaMenus=data.value
        },
        error:(e)=>{}
      })

      if(this.rolUsuario=="Administrador"){
        this.router.navigate(['/pages/dashboard']);
      }else if(this.rolUsuario=="Asesor"){
        this.router.navigate(['/pages/dashboard-v']);
      }

      
     /* this._usuarioServicio.editarActivo(usuario.idUsuario).subscribe({
        next:(data)=>{
          if(data.status)
            {
              const respuesta=data.value;
              console.log("Usuario activo");
            }
        },
        error:(e)=>{}
      })*/
  

    }
  }

  cerrarSesion(){

    console.log(this.idUsuario)
    this._usuarioServicio.editarNoActivo(this.idUsuario).subscribe({
       next:(data)=>{
         if(data.status)
           {
             const respuesta=data.value;
             this._utilidadServicio.mostrarAlerta(
               'Su sesion ha sido cerrada con exito',
               'Listo!'
             );
           }
       },
       error:(e)=>{}
     });

    this._utilidadServicio.eliminarSesionUsuario();

  

    this.router.navigate(['login']);


  }

}
