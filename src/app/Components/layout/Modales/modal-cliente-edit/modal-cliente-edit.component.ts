import { Component, OnInit,Inject} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Prospecto } from 'src/app/Interfaces/prospecto';

import { ProspectoService } from 'src/app/Services/prospecto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

import { Cliente } from 'src/app/Interfaces/cliente';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-modal-cliente-edit',
  templateUrl: './modal-cliente-edit.component.html',
  styleUrls: ['./modal-cliente-edit.component.css']
})
export class ModalClienteEditComponent implements OnInit {

  
  formularioCliente:FormGroup;
  tituloAccion:string="Agregar";
  listaClientes:Cliente[]=[];
  tarjetas:Cliente[]=this.listaClientes;
  botonAccion:string="Guardar";
  movieToFind:string='';
  movieListObject:Cliente[]=this.listaClientes;

  public prospectImage:any;
  public previsualizacion:string;

  imagenPrevia:string="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  constructor(
    private modalActual:MatDialogRef<ModalClienteEditComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCliente:Cliente,
    private fb:FormBuilder,
    private _clienteServicio:ClienteService,
    private _utilidadServicio:UtilidadService) 
    {
      this.formularioCliente=this.fb.group({
        nombre:['',Validators.required],
        fachadaimg:['',Validators.required],
        url:['',Validators.required],
        direccion:['',Validators.required],
        idProspecto:[,Validators.required],
        contacto:['',Validators.required],
        razonSocial:['',Validators.required],
        idauditor:[''],
        detalle:['',Validators.required],
        fecha:['',Validators.required],
        fechaRegistro:['',Validators.required],
        esActivo:['',Validators.required]
      });
  
      if(this.datosCliente!=null){
  
       this.tituloAccion="Editar";
       this.botonAccion="Actualizar";
  
     }
     if(this.movieToFind!=null){
  
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
  
    }
     this._clienteServicio.lista().subscribe({
       next:(data)=>{
         if(data.status)
         this.listaClientes=data.value;
         
  
       },
       error:(e)=>{}
     })
     }
  

  ngOnInit(): void {
    
    if(this.datosCliente!=null){
      this.formularioCliente.patchValue({
      nombre:this.datosCliente.nombre,
      fachadaimg:this.datosCliente.fachadaimg,
      url:this.datosCliente.url,
      direccion:this.datosCliente.direccion,
      idProspecto:this.datosCliente.idProspecto,
      contacto:this.datosCliente.contacto,
      razonSocial:this.datosCliente.razonSocial,
      idauditor:this.datosCliente.idauditor,
      detalle:this.datosCliente.detalle,
      fecha:this.datosCliente.fecha,
      fechaRegistro:this.datosCliente.fechaRegistro,
      esActivo:this.datosCliente.esActivo.toString()
      })

    }

  }
/*
  
  duplicar_Prospecto(){

    this.formularioCliente=this.fb.group({
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
  }*/

  guardarEditar_Cliente(){

    const _cliente:Cliente={
      idCliente:this.datosCliente==null ? 0 : this.datosCliente.idCliente,
      nombre:this.formularioCliente.value.nombre,
      fachadaimg:this.formularioCliente.value.fachadaimg,
      url:this.formularioCliente.value.url,
      direccion:this.formularioCliente.value.direccion,
      idProspecto:this.formularioCliente.value.idProspecto,
      contacto:this.formularioCliente.value.contacto,
      razonSocial:this.formularioCliente.value.razonSocial,
      idauditor:this.formularioCliente.value.idauditor, 
      detalle:this.formularioCliente.value.detalle,
      fecha:this.formularioCliente.value.fecha,
      fechaRegistro:this.formularioCliente.value.fechaRegistro,
      esActivo:parseInt(this.formularioCliente.value.esActivo)
    }
    this.imagenPrevia=_cliente.url;
    if(this.datosCliente==null){

     this._clienteServicio.guardar(_cliente).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El Cliente fue registrado","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el Cliente","Error")
      },
      error:(e)=>{}
     })
    }else{
      const cliente:Cliente={
        idCliente:this.datosCliente==null ? 0 : this.datosCliente.idCliente,
        nombre:this.formularioCliente.value.nombre,
        fachadaimg:this.formularioCliente.value.fachadaimg,
        url:this.formularioCliente.value.url,
        direccion:this.formularioCliente.value.direccion,
        idProspecto:this.formularioCliente.value.idProspecto,
        contacto:this.formularioCliente.value.contacto,
        razonSocial:this.formularioCliente.value.razonSocial,
        idauditor:this.formularioCliente.value.idauditor, 
        detalle:this.formularioCliente.value.detalle,
        fecha:this.formularioCliente.value.fecha,
        fechaRegistro:this.formularioCliente.value.fechaRegistro,
        esActivo:parseInt(this.formularioCliente.value.esActivo)
      }
      this._clienteServicio.editar(cliente).subscribe({
        next:(data)=>{
        if(data.status)
        {
            this._utilidadServicio.mostrarAlerta("El Cliente fue editado","Exito");
            this.modalActual.close("true")
        }
        else
        {
          this._utilidadServicio.mostrarAlerta("No se pudo editar el Cliente","Error")
        }
        },
        error:(e)=>{}
      })
    }
   }

   seleccionado(movieToFind: Event) {

    this.movieListObject=this.listaClientes.filter(m=>m.nombre.toLowerCase().includes(this.movieToFind.toLowerCase()));
    this.tarjetas=this.movieListObject;
  }
  onChange(event:any){
    let reader=new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload=()=>{
    this.prospectImage=reader.result;
   }

  this.prospectImage=this.formularioCliente.value.url;
  }
  

}
