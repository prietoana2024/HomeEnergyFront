import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DomSanitizer } from '@angular/platform-browser';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ProspectoService } from 'src/app/Services/prospecto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { response } from 'express';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-prospecto-img',
  templateUrl: './prospecto-img.component.html',
  styleUrls: ['./prospecto-img.component.css']
})
export class ProspectoImgComponent implements OnInit{

  formularioProspecto:FormGroup;
  tituloAccion:string="Agregar";
  listaProspectos:Prospecto[]=[];
  tarjetas:Prospecto[]=this.listaProspectos;
  botonAccion:string="Guardar";
  movieToFind:string='';
  movieListObject:Prospecto[]=this.listaProspectos;
  datosProspecto:Prospecto;
  ruta:String;
  archivoCapturado:File;


  public previsualizacion:string;
  public loading:boolean;
  public archivos:any=[];
  nombreImagen:string;

  constructor(
    private sanitizer:DomSanitizer,
    private fb:FormBuilder,
    private _prospectoServicio:ProspectoService,
    private _utilidadServicio:UtilidadService
  ) 
  {
    this.formularioProspecto=this.fb.group({
      nombre:['',Validators.required],
      fachadaimg:['',Validators.required],
      url:['',Validators.required],
      direccion:['',Validators.required],
      contacto:['',Validators.required],
      razonSocial:['',Validators.required],
      idauditor:[''],
      detalle:['',Validators.required],
      esActivo:['',Validators.required]
    });

    this._prospectoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaProspectos = data.value;
          console.log(this.listaProspectos);
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
    
   }

  ngOnInit(): void {
    
    
  }
  /*
  crearProspecto(){
    const _prospecto:Prospecto={
      idProspecto:this.datosProspecto==null ? 0 : this.datosProspecto.idProspecto,
      nombre:this.formularioProspecto.value.nombre,
      fachadaimg:this.formularioProspecto.value.fachadaimg,
      url:this.formularioProspecto.value.url,
      direccion:this.formularioProspecto.value.direccion,
      contacto:this.formularioProspecto.value.contacto,
      razonSocial:this.formularioProspecto.value.razonSocial,
      idauditor:this.formularioProspecto.value.idauditor, 
      detalle:this.formularioProspecto.value.detalle,
      esActivo:parseInt(this.formularioProspecto.value.esActivo)
    }
    if(this.datosProspecto==null){

     this._prospectoServicio.guardar(_prospecto).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El Prospecto fue registrado","Exito");
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el Prospecto","Error")
      },
      error:(e)=>{}
     })
    }
  }
  */  
 public enviarData(){

  this.formularioProspecto=this.fb.group({
    nombre:this.datosProspecto.nombre,
    fachadaimg:this.datosProspecto.fachadaimg,
    url:this.datosProspecto.url,
    direccion:this.datosProspecto.direccion,
    contacto:this.datosProspecto.contacto,
    razonSocial:this.datosProspecto.razonSocial,
    idauditor:this.datosProspecto.idauditor, 
    detalle:this.datosProspecto.detalle,
    esActivo:this.datosProspecto.esActivo
  });

  const _prospecto:Prospecto={
    idProspecto:this.datosProspecto==null ? 0 : this.datosProspecto.idProspecto,
    nombre:this.datosProspecto.nombre,
    fachadaimg:this.datosProspecto.fachadaimg,
    url:this.datosProspecto.url,
    direccion:this.datosProspecto.direccion,
    contacto:this.datosProspecto.contacto,
    razonSocial:this.datosProspecto.razonSocial,
    idauditor:this.datosProspecto.idauditor, 
    detalle:this.datosProspecto.detalle,
    esActivo:this.datosProspecto.esActivo
  }

  this._prospectoServicio.guardar(_prospecto).subscribe({
    next:(data)=>{
      if(data.status){
        this._utilidadServicio.mostrarAlerta("El Prospecto fue registrado","Exito");
      }else
      this._utilidadServicio.mostrarAlerta("No se pudo registrar el Prospecto","Error")
    },
    error:(e)=>{}
   })
 }

 public enviarDataModelo(){


  const _ruta=this.ruta;

  const archivo=this.archivoCapturado;

  this._prospectoServicio.guardarImagen(archivo).subscribe({
    next:(data)=>{
      if(data.status){
        this._utilidadServicio.mostrarAlerta("El Prospecto fue registrado","Exito");
        console.log(data);
      }else
      this._utilidadServicio.mostrarAlerta("No se pudo registrar el Prospecto","Error")
    },
    error:(e)=>{}
   })

  this.formularioProspecto=this.fb.group({
    nombre:this.datosProspecto.nombre,
    fachadaimg:this.datosProspecto.fachadaimg,
    url:this.datosProspecto.url,
    direccion:this.datosProspecto.direccion,
    contacto:this.datosProspecto.contacto,
    razonSocial:this.datosProspecto.razonSocial,
    idauditor:this.datosProspecto.idauditor, 
    detalle:this.datosProspecto.detalle,
    esActivo:this.datosProspecto.esActivo
  });

  const _prospecto:Prospecto={
    idProspecto:this.datosProspecto==null ? 0 : this.datosProspecto.idProspecto,
    nombre:this.datosProspecto.nombre,
    fachadaimg:this.datosProspecto.fachadaimg,
    url:this.datosProspecto.url,
    direccion:this.datosProspecto.direccion,
    contacto:this.datosProspecto.contacto,
    razonSocial:this.datosProspecto.razonSocial,
    idauditor:this.datosProspecto.idauditor, 
    detalle:this.datosProspecto.detalle,
    esActivo:this.datosProspecto.esActivo
  }

  this._prospectoServicio.guardar(_prospecto).subscribe({
    next:(data)=>{
      if(data.status){
        this._utilidadServicio.mostrarAlerta("El Prospecto fue registrado","Exito");
      }else
      this._utilidadServicio.mostrarAlerta("No se pudo registrar el Prospecto","Error")
    },
    error:(e)=>{}
   })
 }

 
 capturarFile(event):any{


  this.archivoCapturado=event.target.files[0]
  this.extraerBase64(this.archivoCapturado).then((imagen:any)=>{
   this.previsualizacion=imagen.base;
  
   console.log(imagen);
  })
  this.archivos.push(this.archivoCapturado);


 // alert("la ruta del archivo cargado es:"+this.nombreImagen)
 //console.log(event.target.files);

}

extraerBase64=async($event:any)=>new Promise((resolve,reject)=>{
 try{
   const unsafeImg=window.URL.createObjectURL($event);
   const image=this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
   const reader=new FileReader();
   reader.readAsDataURL($event);
   reader.onload=()=>{
     resolve({
       blob:$event,
       image,
       base:reader.result
     });
 };
 reader.onerror=error=>{
   resolve({
     blob:$event,
     image,
     base:null
   });
 };
}
catch(e){
 return null;
}
});

subirArchivo():any{
 try{
  this.loading=true;
   const formularioDeDatos=new FormData();

   this.archivos.forEach(archivo => {
     console.log(archivo);
     formularioDeDatos.append('files', archivo);
   });



  /* this.archivos.forEach(archivo => {
     console.log(archivo);
     formularioDeDatos.append('files', archivo);
   });*/
   //console.log('Respuesta del servidor',response);

 }

   

   //this.rest.post(`http://localhost:52963/pages/upload`,formularioDeDatos).subscribe(res=>{
    // this.loading=false;
    // console.log('Respuesta del servidor',res);
  // })

 catch(e){
   console.log('ERROR',e);
 }
}

}
