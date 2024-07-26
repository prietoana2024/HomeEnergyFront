import { Component, OnInit,Inject,AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ProspectoService } from 'src/app/Services/prospecto.service';
import { Charts } from 'src/app/Interfaces/charts';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagenService } from 'src/app/Services/imagen.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProspectoComponent } from '../../Modales/modal-prospecto/modal-prospecto.component';
import { ModalPruebaComponent } from '../../Modales/modal-prueba/modal-prueba.component';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {


  file: File = null;

  formularioProspecto:FormGroup;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  movieToFind:string='';
  listaProspectos:Prospecto[]=[];
  tarjetas:Prospecto[]=this.listaProspectos;
  movieListObject:Prospecto[]=this.listaProspectos;
  datosProspecto:Prospecto;
  ruta:String;
  archivoCapturado:File;
  img:String;


  public previsualizacion:string;
  public loading:boolean;
  public archivos:any=[];
  nombreImagen:string;

  columnasTabla: string[] = ['nombre','fachadaimg','url','direccion','contacto','razonSocial','idauditor','detalle','estado','acciones'];
  dataInicio: Prospecto[] = [];
  dataListaProspecto = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;


private baseUrl='http://localhost:5167/api/'

  constructor(
    private sanitizer:DomSanitizer,
    private _prospectoServicio:ProspectoService,
    private _utilidadServicio:UtilidadService,
    private _imagenServicio: ImagenService,
    private httpClient:HttpClient)
  { 
    this._prospectoServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)
        this.listaProspectos=data.value;
        console.log(this.listaProspectos);
      },
      error:(e)=>{}
    });
    this.movieListObject=this.listaProspectos;
    console.log(this.movieListObject);
    this.tarjetas=this.movieListObject;
  }

  obtenerProspecto() {
    this._prospectoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaProspecto.data = data.value;
          console.log(this.dataListaProspecto);
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
  /*getFile(event:Event){
    const  target=event.target as HTMLInputElement;

    const files:FileList | null=target.files;

    if(files!.length>0 && files!=null){
      const formData=new FormData();

      Array.prototype.forEach.call(files,(file:File)=>{
        formData.append("files",file);
      });
      this._imagenServicio.upload2(formData).subscribe({
        next:(response) =>{
        console.log(response);
        },
        error:(err:HttpErrorResponse)=>{
        console.log(err);
        },
        complete:()=>{
          console.log("se completo la tarea");
        }
      })
    }
  }
*/
  trackByItems(index:number,listaProspectos:any):number{
    return listaProspectos.idProspecto;
  }
 /*getFile2(event:Event){
    const  target=event.target as HTMLInputElement;

    const files:FileList | null=target.files;

    if(files!.length>0 && files!=null){
      const formData=new FormData();

      Array.prototype.forEach.call(files,(file:File)=>{
        formData.append("files",file);
      });
  this._imagenServicio.upload2(formData).subscribe({
    next:(data)=>{
      if(data){
        this._utilidadServicio.mostrarAlerta("El prospecto fue registrado","Exito");
      }else
      this._utilidadServicio.mostrarAlerta("No se pudo registrar el prospecto","Error")
    },
    error:(e)=>{}
   })
 }
}*/

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  
  upload() {
    if (this.file) {
      this._prospectoServicio.guardarImagen(this.file).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El Prospecto fue registrado","Exito");
            console.log("la respuesta es si"+data);
          }else
          this._utilidadServicio.mostrarAlerta("No se pudo registrar el Prospecto","Error")
        },
        error:(e)=>{}
      })
      /*
      this.imagenServicio.uploadfile(this.file).subscribe(resp => {
        alert("Uploaded")
      })*/
    } else {
      alert("Please select a file first")
    }
  }



  public imagenForm=new FormGroup({
    image:new FormControl('',Validators.required)
  });

  ngOnInit(): void {
    this.obtenerProspecto();
    
  }

  addNewProspect(data:ProspectoService){

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

    console.log('New prospecto',data);
  }

  
 capturarFile(event):any{


  this.archivoCapturado=event.target.files[0];
  this.extraerBase64(this.archivoCapturado).then((imagen:any)=>{
    this.previsualizacion=imagen.base;
   
    console.log(imagen);
  var fachadaimg=imagen.base;

    this._prospectoServicio.base64(fachadaimg).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El Prospecto fue registrado","Exito");
          console.log(data);
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el Prospecto","Error")
      },
      error:(e)=>{}
    })
   })
  this.archivos.push(this.archivoCapturado);


 // alert("la ruta del archivo cargado es:"+this.nombreImagen)
 //console.log(event.target.files);

}
aplicarFiltro(movieToFind: Event) {
  this.movieListObject=this.listaProspectos.filter(m=>m.nombre.toLowerCase().includes(this.movieToFind.toLowerCase()));
  console.log(this.movieListObject);
  this.tarjetas=this.movieListObject;
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
      this.img=archivo;


      this._prospectoServicio.upload(archivo).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El prospecto fue registrado","Exito");
          }else
          this._utilidadServicio.mostrarAlerta("No se pudo registrar el prospecto","Error")
        },
        error:(e)=>{}
       });

       console.log("ya envie al guardar imagen")

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

 imageUpload(event:any){
  
  var file=event.target.files[0];
  const formData:FormData=new FormData();
  formData.append('file',file,file.name);

  this._prospectoServicio.guardarImagen(file).subscribe({
    next:(data:any)=>{
      if(data.status){
        this._utilidadServicio.mostrarAlerta("El prospecto fue registrado","Exito");
      }else
      this._utilidadServicio.mostrarAlerta("No se pudo registrar el prospecto","Error")
    },
    error:(e)=>{}
   });
 }
 imageUpload2(event:any){
  
  var file=event.target.files[0];
  const formData:FormData=new FormData();
  formData.append('file',file,file.name);

  this._prospectoServicio.upload(file).subscribe({
    next:(data)=>{
      if(data.status){
        this._utilidadServicio.mostrarAlerta("La imagen fue cargada con exito","Exito");
      }else
      this._utilidadServicio.mostrarAlerta("No se cargar la imagen","Error")
    },
    error:(e)=>{}
   });
 }

}
