import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ProspectoService } from 'src/app/Services/prospecto.service';

@Component({
  selector: 'app-modal-prueba',
  templateUrl: './modal-prueba.component.html',
  styleUrls: ['./modal-prueba.component.css']
})
export class ModalPruebaComponent implements OnInit {

  formularioProspecto:FormGroup;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";

  constructor(
    private modalActual:MatDialogRef<ModalPruebaComponent>,
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
      idauditor:['',Validators.required],
      detalle:['',Validators.required],
      esActivo:['',Validators.required]
    });

    if(this.datosProspecto!=null){

     this.tituloAccion="Editar";
     this.botonAccion="Actualizar";

   }

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
    if(this.datosProspecto==null){

     this._prospectoServicio.guardar(_prospecto).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El prospecto fue registrado","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el prospecto","Error")
      },
      error:(e)=>{}
     })
    }else{
      this._prospectoServicio.editar(_prospecto).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El prospecto fue editado","Exito");
            this.modalActual.close("true")
          }else
          this._utilidadServicio.mostrarAlerta("No se pudo editar el prospecto","Error")
        },
        error:(e)=>{}
      })
    }
   }


}
