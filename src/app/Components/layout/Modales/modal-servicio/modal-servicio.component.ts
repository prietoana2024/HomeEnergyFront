import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from 'src/app/Interfaces/categoria';
import { Servicio } from 'src/app/Interfaces/servicio';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ServicioService } from 'src/app/Services/servicio.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-servicio',
  templateUrl: './modal-servicio.component.html',
  styleUrls: ['./modal-servicio.component.css']
})
export class ModalServicioComponent implements OnInit {

  formularioServicio:FormGroup;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaCategorias:Categoria[]=[];

  constructor(
    private modalActual:MatDialogRef<ModalServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosServicio:Servicio,
    private fb:FormBuilder,
    private _categoriaServicio:CategoriaService,
    private _servicioServicio:ServicioService,
    private _utilidadServicio:UtilidadService
  ) 
  
  {
     this.formularioServicio=this.fb.group({
       nombre:['',Validators.required],
       idCategoria:['',Validators.required],
       descripcionCategoria:['',Validators.required],
       precio:['',Validators.required],
       esActivo:['',Validators.required]
     });

     if(this.datosServicio!=null){

      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";

    }
    this._categoriaServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)
        this.listaCategorias=data.value
      },
      error:(e)=>{}
    })


  }

  ngOnInit(): void {
    if(this.datosServicio!=null){
      this.formularioServicio.patchValue({
      nombre:this.datosServicio.nombre,
      idCategoria:this.datosServicio.idCategoria,
      precio:this.datosServicio.precio,
      esActivo:this.datosServicio.esActivo.toString()

      })
    }
  }
  
  guardarEditar_Servicio(){

    const _servicio:Servicio={
      idServicio:this.datosServicio==null ? 0 : this.datosServicio.idServicio,
      nombre:this.formularioServicio.value.nombre,
      idCategoria:this.formularioServicio.value.idCategoria,
      descripcionCategoria:"",
      precio:this.formularioServicio.value.precio,
      esActivo:parseInt(this.formularioServicio.value.esActivo)
    }
    if(this.datosServicio==null){

     this._servicioServicio.guardar(_servicio).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El servicio fue registrado","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el servicio","Error")
      },
      error:(e)=>{}
     })
    }else{
      this._servicioServicio.editar(_servicio).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El servicio fue editado","Exito");
            this.modalActual.close("true")
          }else
          this._utilidadServicio.mostrarAlerta("No se pudo editar el servicio","Error")
        },
        error:(e)=>{}
      })
    }
   }

}
