
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service'
import { CotizacionService } from 'src/app/Services/cotizacion.service';
import { Cotizacion } from 'src/app/Interfaces/cotizacion';
import { ServicioService } from 'src/app/Services/servicio.service';
import { Servicio } from 'src/app/Interfaces/servicio';

@Component({
  selector: 'app-modal-simulacion-pdf',
  templateUrl: './modal-simulacion-pdf.component.html',
  styleUrls: ['./modal-simulacion-pdf.component.css']
})
export class ModalSimulacionPdfComponent implements OnInit {

  formularioCotizacion:FormGroup;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";

  formularioServicioVenta:FormGroup;
  listaServicios:Servicio[]=[];
  listaServiciosFiltro:Servicio[]=[];

  listaServiciosAgregados:Servicio[]=[];

  servicioSeleccionado!:Servicio;
 
  constructor(
    private modalActual:MatDialogRef<ModalSimulacionPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCotizacion:Cotizacion,
    private fb:FormBuilder,
    private _cotizacionServicio:CotizacionService,
    private _utilidadServicio:UtilidadService,
    private _servicioServicio:ServicioService
  )
   {

    this._servicioServicio.lista().subscribe({
      next:(data)=>{
        if(data.status){
          const lista=data.value as Servicio[];
          this.listaServicios=lista.filter(p=>p.esActivo==1);
        }
      },
      error:(e)=>{}
    })

    this.formularioCotizacion=this.fb.group({
      IdProspecto:[,Validators.required],
      Pulgadas2:[,Validators.required],
      TipoPago:['',Validators.required],
      TotalTexto:['',Validators.required],
      TiempoFinancing:[,Validators.required],
      AhorraTexto:['',Validators.required],
      ValorInteresesTexto:['',Validators.required],
      CuotaMensualTexto:['',Validators.required],
      PagoElectricidadTexto:['',Validators.required],
      PorcentajeIncremento:[,Validators.required],
      MensualAproxTexto:['',Validators.required],
      ValorPagadoTexto:['',Validators.required],
      ProyeccionSolarTexto:['',Validators.required],
      TiempoSolar:[,Validators.required],
      Contrato:['',Validators.required],
      Email:['',Validators.required],
      TipoIdentificacion:['',Validators.required],
      Identificacion:[,Validators.required],
      SocEin:[,Validators.required],
      TamanoSistema:['',Validators.required],
      PagoInicialTexto:['',Validators.required],
      Notas:['',Validators.required],
      Url1:[''],
      Url2:[''],
      Url3:[''],
      Url4:[''],
      Pdf:['',Validators.required],
      FechaRegistro:['',Validators.required],
      Servicios:this.listaServicios
    });

    if(this.datosCotizacion!=null){

     this.tituloAccion="Editar";
     this.botonAccion="Actualizar";

   }

   }

  ngOnInit(): void {

    if(this.datosCotizacion!=null){
      this.formularioCotizacion.patchValue({
      IdProspecto:this.datosCotizacion.idProspecto,
      Pulgadas2:this.datosCotizacion.pulgadas2,
      TipoPago:this.datosCotizacion.tipoPago,
      TotalTexto:this.datosCotizacion.totalTexto,
      TiempoFinancing:this.datosCotizacion.tiempoFinancing,
      AhorraTexto:this.datosCotizacion.ahorraTexto,
      ValorInteresesTexto:this.datosCotizacion.valorInteresesTexto,
      CuotaMensualTexto:this.datosCotizacion.cuotaMensualTexto,
      PagoElectricidadTexto:this.datosCotizacion.pagoElectricidadTexto,
      PorcentajeIncremento:this.datosCotizacion.porcentajeIncremento,
      MensualAproxTexto:this.datosCotizacion.mensualAproxTexto,
      ValorPagadoTexto:this.datosCotizacion.valorPagadoTexto,
      ProyeccionSolarTexto:this.datosCotizacion.proyeccionSolarTexto,
      TiempoSolar:this.datosCotizacion.tiempoSolar,
      Contrato:this.datosCotizacion.contrato,
      Email:this.datosCotizacion.email,
      TipoIdentificacion:this.datosCotizacion.tipoIdentificacion,
      Identificacion:this.datosCotizacion.identificacion,
      SocEin:this.datosCotizacion.socEin,
      TamanoSistema:this.datosCotizacion.tamanoSistema,
      PagoInicialTexto:this.datosCotizacion.pagoInicialTexto,
      Notas:this.datosCotizacion.notas,
      Url1:this.datosCotizacion.url1,
      Url2:this.datosCotizacion.url2,
      Url3:this.datosCotizacion.url3,
      Url4:this.datosCotizacion.url4,
      Pdf:this.datosCotizacion.pdf,
      Servicios:this.datosCotizacion.Servicios,
      })
      const _arreglo:Servicio[]=this.formularioCotizacion.value.Servicios;
    }
  }

  servicioParaVenta(event:any){
    this.servicioSeleccionado=event.option.value;
    console.log(this.servicioSeleccionado);

  }
  mostrarServicio(producto:Servicio):string{
    return producto.nombre;
  }

  Editar_Cotizacion(){

    console.log("Entre a la funcion");
  
    const _arreglo:Servicio[]=this.formularioCotizacion.value.Servicios;

    const _cotizacion:Cotizacion={
      idCotizacion:this.datosCotizacion==null ? 0 : this.datosCotizacion.idCotizacion,
      idProspecto:this.formularioCotizacion.value.IdProspecto,
      pulgadas2:this.formularioCotizacion.value.Pulgadas2,
      tipoPago:this.formularioCotizacion.value.TipoPago,
      totalTexto:this.formularioCotizacion.value.TotalTexto,
      tiempoFinancing:this.formularioCotizacion.value.TiempoFinancing,
      ahorraTexto:this.formularioCotizacion.value.AhorraTexto,
      valorInteresesTexto:this.formularioCotizacion.value.ValorInteresesTexto,
      cuotaMensualTexto:this.formularioCotizacion.value.CuotaMensualTexto,
      pagoElectricidadTexto:this.formularioCotizacion.value.PagoElectricidadTexto,
      porcentajeIncremento:this.formularioCotizacion.value.PorcentajeIncremento,
      mensualAproxTexto:this.formularioCotizacion.value.MensualAproxTexto,
      valorPagadoTexto:this.formularioCotizacion.value.ValorPagadoTexto,
      proyeccionSolarTexto:this.formularioCotizacion.value.ProyeccionSolarTexto,
      tiempoSolar:this.formularioCotizacion.value.TiempoSolar,
      contrato:this.formularioCotizacion.value.Contrato,
      email:this.formularioCotizacion.value.Email,
      tipoIdentificacion:this.formularioCotizacion.value.TipoIdentificacion,
      identificacion:this.formularioCotizacion.value.Identificacion,
      socEin:this.formularioCotizacion.value.SocEin,
      tamanoSistema:this.formularioCotizacion.value.TamanoSistema,
      pagoInicialTexto:this.formularioCotizacion.value.PagoInicialTexto,
      notas:this.formularioCotizacion.value.Notas,
      url1:this.formularioCotizacion.value.Url1,
      url2:this.formularioCotizacion.value.Url2,
      url3:this.formularioCotizacion.value.Url3,
      url4:this.formularioCotizacion.value.Url4,
      pdf:this.formularioCotizacion.value.Pdf,
      Servicios:this.formularioCotizacion.value.Servicios}
      console.log(_arreglo);

      this._cotizacionServicio.editarCotizacion(_cotizacion).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El usuario fue editado","Exito");
            this.modalActual.close("true")
          }else
          this._utilidadServicio.mostrarAlerta("No se pudo editar el usuario","Error")
        },
        error:(e)=>{}
      })
    
   }
   Crear_Cotizacion(){

    console.log("Entre a la funcion");
  
    const _arreglo:Servicio[]=this.formularioCotizacion.value.Servicios;

    const _cotizacion:Cotizacion={
      idCotizacion:this.datosCotizacion==null ? 0 : this.datosCotizacion.idCotizacion,
      idProspecto:this.formularioCotizacion.value.IdProspecto,
      pulgadas2:this.formularioCotizacion.value.Pulgadas2,
      tipoPago:this.formularioCotizacion.value.TipoPago,
      totalTexto:this.formularioCotizacion.value.TotalTexto,
      tiempoFinancing:this.formularioCotizacion.value.TiempoFinancing,
      ahorraTexto:this.formularioCotizacion.value.AhorraTexto,
      valorInteresesTexto:this.formularioCotizacion.value.ValorInteresesTexto,
      cuotaMensualTexto:this.formularioCotizacion.value.CuotaMensualTexto,
      pagoElectricidadTexto:this.formularioCotizacion.value.PagoElectricidadTexto,
      porcentajeIncremento:this.formularioCotizacion.value.PorcentajeIncremento,
      mensualAproxTexto:this.formularioCotizacion.value.MensualAproxTexto,
      valorPagadoTexto:this.formularioCotizacion.value.ValorPagadoTexto,
      proyeccionSolarTexto:this.formularioCotizacion.value.ProyeccionSolarTexto,
      tiempoSolar:this.formularioCotizacion.value.TiempoSolar,
      contrato:this.formularioCotizacion.value.Contrato,
      email:this.formularioCotizacion.value.Email,
      tipoIdentificacion:this.formularioCotizacion.value.TipoIdentificacion,
      identificacion:this.formularioCotizacion.value.Identificacion,
      socEin:this.formularioCotizacion.value.SocEin,
      tamanoSistema:this.formularioCotizacion.value.TamanoSistema,
      pagoInicialTexto:this.formularioCotizacion.value.PagoInicialTexto,
      notas:this.formularioCotizacion.value.Notas,
      url1:this.formularioCotizacion.value.Url1,
      url2:this.formularioCotizacion.value.Url2,
      url3:this.formularioCotizacion.value.Url3,
      url4:this.formularioCotizacion.value.Url4,
      pdf:this.formularioCotizacion.value.Pdf,
      Servicios:this.formularioCotizacion.value.Servicios}
      console.log(_arreglo);

     this._cotizacionServicio.registrar(_cotizacion).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("La simulacióm fue registrada con exito","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar la simulacion","Error")
      },
      error:(e)=>{}
     })
   }

}
