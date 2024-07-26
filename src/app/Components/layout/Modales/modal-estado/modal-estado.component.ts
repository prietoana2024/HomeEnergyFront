import { Component, OnInit,Inject} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Estado } from 'src/app/Interfaces/estado';

import { EstadoService } from 'src/app/Services/estado.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-estado',
  templateUrl: './modal-estado.component.html',
  styleUrls: ['./modal-estado.component.css']
})
export class ModalEstadoComponent implements OnInit {

  formularioEstado:FormGroup;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaEstados:Estado[]=[];

  constructor(

    private modalActual:MatDialogRef<ModalEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosEstado:Estado,
    private fb:FormBuilder,
    private _estadoServicio:EstadoService,
    private _utilidadServicio:UtilidadService

  ) 
  {

    this.formularioEstado=this.fb.group({
      nombre:['',Validators.required]
    });

    if(this.datosEstado!=null){

     this.tituloAccion="Editar";
     this.botonAccion="Actualizar";

   }
   this._estadoServicio.lista().subscribe({
     next:(data)=>{
       if(data.status)
       this.listaEstados=data.value
     },
     error:(e)=>{}
   })

  }

  ngOnInit(): void {
    if(this.datosEstado!=null){
      this.formularioEstado.patchValue({
        nombre:this.datosEstado.nombre
      })
    }
  }

  guardarEditar_Estado(){

    const _estado:Estado={
      idEstado:this.datosEstado==null ? 0 : this.datosEstado.idEstado,
      nombre:this.formularioEstado.value.nombre
    }
    if(this.datosEstado==null){

     this._estadoServicio.guardar(_estado).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El estado fue registrado","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el estado","Error")
      },
      error:(e)=>{}
     })
    }else{
      this._estadoServicio.editar(_estado).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El estado fue editado","Exito");
            this.modalActual.close("true")
          }else
          this._utilidadServicio.mostrarAlerta("No se pudo editar el servicio","Error")
        },
        error:(e)=>{}
      })
    }
   }


}
