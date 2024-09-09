import { Component, OnInit,Inject} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Prospecto } from 'src/app/Interfaces/prospecto';

import { ProspectoService } from 'src/app/Services/prospecto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-prospecto',
  templateUrl: './modal-prospecto.component.html',
  styleUrls: ['./modal-prospecto.component.css']
})
export class ModalProspectoComponent implements OnInit {

  formularioProspecto:FormGroup;
  tituloAccion:string="Agregar";
  listaProspectos:Prospecto[]=[];
  tarjetas:Prospecto[]=this.listaProspectos;
  botonAccion:string="Guardar";
  movieToFind:string='';
  movieListObject:Prospecto[]=this.listaProspectos;

  public prospectImage:any;
  public previsualizacion:string;

  imagenPrevia:string="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  constructor(
    private modalActual:MatDialogRef<ModalProspectoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProspecto:Prospecto,
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

    if(this.datosProspecto!=null){

     this.tituloAccion="Editar";
     this.botonAccion="Actualizar";

   }
   if(this.movieToFind!=null){

    this.tituloAccion="Editar";
    this.botonAccion="Actualizar";

  }
   this._prospectoServicio.lista().subscribe({
     next:(data)=>{
       if(data.status)
       this.listaProspectos=data.value;
       

     },
     error:(e)=>{}
   })
  }

  ngOnInit(): void {

    

    if(this.datosProspecto!=null){
      this.formularioProspecto.patchValue({
      nombre:this.datosProspecto.nombre,
      fachadaimg:this.datosProspecto.fachadaimg,
      url:this.datosProspecto.url,
      direccion:this.datosProspecto.direccion,
      contacto:this.datosProspecto.contacto,
      razonSocial:this.datosProspecto.razonSocial,
      idauditor:this.datosProspecto.idauditor,
      detalle:this.datosProspecto.detalle,
      esActivo:this.datosProspecto.esActivo.toString()
      })

    }

    
  }
 
  duplicar_Prospecto(){

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
    if(this.datosProspecto==null){

     this._prospectoServicio.guardar(_prospecto).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El Prospecto fue registrado","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el Prospecto","Error")
      },
      error:(e)=>{}
     })
    }
  }

  guardarEditar_Prospecto(){

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
    this.imagenPrevia=_prospecto.url;
    if(this.datosProspecto==null){

     this._prospectoServicio.guardar(_prospecto).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El Prospecto fue registrado","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el Prospecto","Error")
      },
      error:(e)=>{}
     })
    }else{
      const prospecto:Prospecto={
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
      this._prospectoServicio.editar(prospecto).subscribe({
        next:(data)=>{
        if(data.status)
        {
            this._utilidadServicio.mostrarAlerta("El Prospecto fue editado","Exito");
            this.modalActual.close("true")
        }
        else
        {
          this._utilidadServicio.mostrarAlerta("No se pudo editar el Prospecto","Error")
        }
        },
        error:(e)=>{}
      })
    }
   }

   seleccionado(movieToFind: Event) {

    this.movieListObject=this.listaProspectos.filter(m=>m.nombre.toLowerCase().includes(this.movieToFind.toLowerCase()));
    this.tarjetas=this.movieListObject;
  }
  onChange(event:any){
    let reader=new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload=()=>{
    this.prospectImage=reader.result;
   }

  this.prospectImage=this.formularioProspecto.value.url;
  }
  
}
