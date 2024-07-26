import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProspectoService } from 'src/app/Services/prospecto.service';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { response } from 'express';

import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public prospectImage:any;
  public prospectImage1:any
  public previsualizacion:string;
  public previsualizacion1:string;
  public loading:boolean;
  public archivos:any=[];
  listaProspectos:Prospecto[]=[];
  nombreImagen:string;

  constructor(
    private sanitizer:DomSanitizer,
    private _prospectoServicio:ProspectoService,
    private _utilidadServicio:UtilidadService) 
    { 
      this._prospectoServicio.lista().subscribe({
        next:(data)=>{
          if(data.status)
          this.listaProspectos=data.value;
   
        },
        error:(e)=>{}
      })
  }

  

  ngOnInit(): void {

  }
  form = new FormGroup({
    first: new FormControl('Nancy', Validators.minLength(2)),
    last: new FormControl('Drew'),
  });

  get first(): any {
    return this.form.get('first');
  }

  onSubmit(): void {
    console.log(this.form.value); // {first: 'Nancy', last: 'Drew'}
    console.log(this.form.value.first);
    console.log(this.form.value.last);
    
  }

  onChange(event:any){

    

    let reader=new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload=()=>{
    this.prospectImage=reader.result;
   }

  this.prospectImage1=this.form.value.last;
  }

  capturarFile(event):any{


     const archivoCapturado=event.target.files[0]
     this.extraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacion=imagen.base;
     
      console.log(imagen);
     })
     this.archivos.push(archivoCapturado);
     const object1 = this.archivos;
    
    console.log(Object.values(object1));


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
/*
  imagenProspecto(prospecto:Prospecto){

    const _prospecto=prospecto;

    this._prospectoServicio.guardarImagen(_prospecto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta(
                'La imagen fue cargada correctamente'+_prospecto,
                'Listo!'
              );
            } else {
              this._utilidadServicio.mostrarAlerta(
                'No se pudo eliminar',
                'Error'
              );
            }
          },
          error: (e) => {},
        });
      }

  */

}
