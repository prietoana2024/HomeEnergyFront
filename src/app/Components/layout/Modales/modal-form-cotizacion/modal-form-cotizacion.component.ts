
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service'
import { CotizacionService } from 'src/app/Services/cotizacion.service';
import { Cotizacion } from 'src/app/Interfaces/cotizacion';
import { ServicioService } from 'src/app/Services/servicio.service';
import { Servicio } from 'src/app/Interfaces/servicio';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleVenta } from 'src/app/Interfaces/detalle-venta';
import { Usuario } from 'src/app/Interfaces/usuario';
//MIS COMPONENTES DE LA GRAFICA

import { IBarChart } from 'src/app/Interfaces/charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
export const DATA_BAR_CHART:IBarChart[]=[
  {
    "name": "Inicial",
    "value": 0
  }
];
import {ThemePalette} from '@angular/material/core';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

//NECESARIOS PARA CREAR PDF

import { Email } from 'src/app/Interfaces/email';
import { EmailService } from 'src/app/Services/email.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer } from '@angular/platform-browser';


import { PdfService } from 'src/app/Services/pdf.service';
@Component({
  selector: 'app-modal-form-cotizacion',
  templateUrl: './modal-form-cotizacion.component.html',
  styleUrls: ['./modal-form-cotizacion.component.css']
})
export class ModalFormCotizacionComponent implements OnInit {

  email:string;
  tamanoSistema:string;
  tipoIdentificacion:string;
  identificacion:number;
  socEin:number;
  notas:string;
  
  url1:any;
  url2:any;
  url3:any;
  url4:any;

  myTextarea:string="This General Release (this “Release”) is made on NaN-NaN-NaN between Dayna Garcia and Nevada Power Solutions 1. Releasor and anyone claiming on behalf of Releasor releases and forever discharges Releasee and its af/liates, successors and assigns, of/cers, employees, representatives, partners, agents and anyone claiming through them (collectively, the “Released Parties”), in their individual and3or corporate capacities from any and all claims outside the scope of Solar installation and liabilities, obligations, promises, agreements, disputes, demands, damages, causes of action of any nature and kind, known or unknown, which Releasor has or ever had or may in the future have against Releasee or any of the Released Parties arising out of or relating to: Adders to the system outside the scope of Solar Installation.(“Claims”). 2. This Release shall not be in any way construed as an admission by the Releasee that it has acted wrongfully with respect to Releasor or any other person, that it admits liability or responsibility at any time for any purpose, or that Releasor has any rights whatsoever against the Releasee. nB. This Release shall be binding upon and inure to the bene/t of the parties and their respective heirs, administrators, personal representatives, executors, successors and assigns. Releasor has the authorityto release the Claims and has not assigned or transferred any Claims to any other party. The provisionsof this Release are severable. If any provision is held to be invalid or unenforceable, it shall not affect thevalidity or enforceability of any other provision. This Release constitutes the entire agreement betweenthe parties and supersedes any and all prior oral or written agreements or understandings betweenthe parties concerning the subject matter of this Release. This Release may not be altered, amendedor modi/ed, except by a written document signed by both parties. The terms of this Release shall begoverned by and construed in accordance with the laws of the State3Commonwealth of Nevada Power Solutions. 4. +oth parties represent they fully understand their right to review all aspects of this Release withattorneys of their choice, that they have had the opportunity to consult with attorneys of their choice,that they have carefully read and fully understand all the provisions of this Release and that they are freely, knowingly and voluntarily entering into this Release.";

  clic = 1;
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;
  //VARIABLES DE FINANCING 
  pagoInicialTexto:string;
  contratoModificado:string;
  pagoElectricidadTexto:string;
  porcentajeIncremento:number;
  mensualAproxTexto:string;
  valorPagadoTexto:string;
  proyeccionSolarTexto:string;
  tiempoSolar=30;

  ahorraTexto:string;
  valorInteresesTexto:string;
  cuotaMensualTexto:string;
  tiempoFinancing:number;

  totalInteres:number=0;
  interesxMes:number=0;
  comisiones:number=0;
  valorCuota:number=0;
  ahorra:number=0;

  totalPagarTxt:string[];
  totalInteresTxt:string[];
  interesxMesTxt:string[];
  comisionesTxt:string[];
  valorCuotaTxt:string[];
  ahorraTxt:string[];

  facturaEE:number=0;
  facturaES:number=0;
  porcentajeIA:number=0;
  totalEE:number=0;
  totalEETxt:string[];

  cuotaInicial: number;
  totalPagosAnuales:number;
  tasaIncrementoAnual: number;
  numeroAnios: number;
  valorTotalAnual:number;
  tasaDescuentoAnual:number;
  cuotasMensualesES:number;
  cuotasMensualesESTxt:string[];
  cuotasMensualesEE:number;
  cuotasMensualesEETxt:string[];
  cuotaInicialTxt:string[];
  totalPagosAnualesTxt:string[];
  //TERMINAN VARIABLES DE FINANCING
  //componente de acepto 
  //GRAFICAS 
  data:IBarChart[]=[];
  view: [number,number] = [800,800];
  colorScheme: Color = { domain: ['#76ff03', '#ffeb3b', '#ff0000', '#40c4ff',], group: ScaleType.Ordinal, selectable: true, name: 'Customer Usage', };

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  //GRAFICAS TERMINA
  

  totalPagar:number=0;
  inicial:number;
  name:string;
  lado = 4;
  pulgadas:number;
  cantidad:string;
  subtotal:string[]=[];

  formularioCotizacion:FormGroup;

  formularioServicioVenta:FormGroup;
  listaServicios:Servicio[]=[];
  listaServiciosFiltro:Servicio[]=[];

  listaServiciosAgregados:Servicio[]=[];

  servicioSeleccionado!:Servicio;


  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";

  itemProspecto:Prospecto;
 
  listServices:Servicio[]=[];
  listaServiciosAgregadosALaOrden:Servicio[]=[];
  listaServiciosParaVenta:DetalleVenta[]=[];
  columnasTabla:string[]=['servicio','precio','accion'];
  datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);
  
  public pulgadasCuadradas:string;
  public pulgadas2:number;
  

  
  //VARIABLES DE LA SEPARACION DE LOS SERVICIOS EN VARIABLES
  public dt;
    
  public serviceCantidad0=0;
  public servicedescripcionServicio0="";
  public serviceprecioTexto0=" ";
  public servicetotalTexto0=" ";

  public serviceCantidad1=0;
  public servicedescripcionServicio1="";
  public serviceprecioTexto1=" ";
  public servicetotalTexto1=" ";

  public serviceCantidad2=0;
  public servicedescripcionServicio2="";
  public serviceprecioTexto2=" ";
  public servicetotalTexto2=" ";

  public serviceCantidad3=0;
  public servicedescripcionServicio3="";
  public serviceprecioTexto3=" ";
  public servicetotalTexto3=" ";
  //TERMINA LA SEPARACION
  //VARIABLES DEL PDF
  public archivos:any=[];
  date = new Date();
  public templateEmail:string;
  
  public imagen1:string;
  public imagen2:string;
  public imagen3:string;
  public imagen4:string;
  public firmaCliente:string;
  public firmaHomeEnergy:string;
  
  public previsualizacion1:string;
  public previsualizacion2:string;
  public previsualizacion3:string;
  public previsualizacion4:string;
  public previsualizacion5:string;
  public previsualizacion6:string;

  pdfString:String;
  //TERMINA VARIABLES DEL PDF

  formularioEmail:FormGroup;


  tipodePagoPorDefecto:string="Efectivo";
  constructor(
    private modalActual:MatDialogRef<ModalFormCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProspecto:Prospecto,
    private fb:FormBuilder,
    private _cotizacionServicio:CotizacionService,
    private _utilidadServicio:UtilidadService,
    private _servicioServicio:ServicioService,
    private _emailServicio:EmailService,
    public pdfService:PdfService,
    private sanitizer:DomSanitizer)
    
    {

      //FORMULARIO ENVIO DE INFORMACION PARA EL CORREO 
    this.formularioEmail=this.fb.group({
      para:['',[Validators.required, Validators.email]],
      asunto:['Cotización Home Energy',Validators.required],
      contenido:['',Validators.required]
    });
    

      this._servicioServicio.lista().subscribe({
        next:(data)=>{
          if(data.status){
            const lista=data.value as Servicio[];
            this.listaServicios=lista.filter(p=>p.esActivo==1);
          }
        },
        error:(e)=>{}
      })

      if(datosProspecto!=null){
        this.itemProspecto=datosProspecto;
      }
  
     
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
      if(this.datosProspecto!=null){

        this.tituloAccion="Editar";
        this.botonAccion="Actualizar";
   
      }
     }

  ngOnInit(): void {
    if(this.datosProspecto!=null){
      this.formularioCotizacion.patchValue({
      IdProspecto:this.datosProspecto.idProspecto /*,
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
      Servicios:this.datosCotizacion.Servicios,*/
      })
      const _arreglo:Servicio[]=this.formularioCotizacion.value.Servicios;
    }
    this.data=DATA_BAR_CHART;

    setTimeout(()=>{
      console.log('*****');
      const dataPeru={
        name:"agregado por mi",
        value:586
      };
      this.data=[...this.data,dataPeru];
    },1500);
  }


  
  servicioParaVenta(item:Servicio){
    this.servicioSeleccionado=item;

    console.log(this.servicioSeleccionado);
    
    const pulga=this.formularioCotizacion.value.Pulgadas2;
    console.log(pulga)

    
    
    this.agregarServicioParaVenta();

  }
  mostrarServicio(producto:Servicio):string{
    return producto.nombre;
  }

  Editar_Cotizacion(){

    console.log("Entre a la funcion");
  
    const _arreglo:Servicio[]=this.formularioCotizacion.value.Servicios;

    const _cotizacion:Cotizacion={
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
  
   // const _arreglo:Servicio[]=this.formularioCotizacion.value.Servicios;

   this.formularioCotizacion.value.Servicios=this.listaServiciosParaVenta;
   console.log(this.listaServiciosAgregadosALaOrden);

   this.formularioCotizacion.value.PagoInicialTexto=this.inicial.toString();

    this.formularioCotizacion.value.TipoPago=this.tipodePagoPorDefecto;
    this.formularioCotizacion.value.Contrato=this.myTextarea;
    this.formularioCotizacion.value.Email=this.email;
    this.formularioCotizacion.value.TipoIdentificacion=this.tipoIdentificacion;
    this.formularioCotizacion.value.Identificacion=this.identificacion;
    this.formularioCotizacion.value.SocEin=this.socEin;
    this.formularioCotizacion.value.TamanoSistema=this.tamanoSistema;
    this.formularioCotizacion.value.Notas=this.notas;
    this.formularioCotizacion.value.Url1=this.url1;
    this.formularioCotizacion.value.Url2=this.url2;
    this.formularioCotizacion.value.Url3=this.url3;
    this.formularioCotizacion.value.Url4=this.url4;
    this.formularioCotizacion.value.TotalTexto=this.totalPagar.toString();

    const _cotizacion:Cotizacion={
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
      pdf:"Mi pdf",
      Servicios:this.formularioCotizacion.value.Servicios
    }
      //console.log(_arreglo);

      console.log(_cotizacion);
     this._cotizacionServicio.registrar(_cotizacion).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("La simulacióm fue registrada con exito","Exito");
         // this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar la simulacion","Error")
      },
      error:(e)=>{}
     })
   }

agregarServicioParaVenta(){
if(this.formularioCotizacion.value.Pulgadas2!=null){

  const _cantidad:number=this.formularioCotizacion.value.Pulgadas2;
  const _precio:number=parseFloat(this.servicioSeleccionado.precio);
  const _total:number=_cantidad*_precio;
  this.totalPagar=this.totalPagar+_total;
  const _incremento:number=this.tasaIncrementoAnual;

  this.totalPagar.toFixed(0);

  this.listaServiciosParaVenta.push({
    idServicio:this.servicioSeleccionado.idServicio,
    descripcionServicio:this.servicioSeleccionado.nombre,
    idEstado:1,
    estadoDescripcion:'',
    cantidad:_cantidad,
    precioTexto:String(_precio.toFixed(2)),
    totalTexto:String(_total.toFixed(2))
  })

  console.log(this.listaServiciosParaVenta)

  this.datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);

  this.formularioServicioVenta.patchValue({
    servicio:'',
    cantidad:''
  })

  this.listaServiciosAgregadosALaOrden.push({
    idServicio:this.servicioSeleccionado.idServicio,
    nombre:this.servicioSeleccionado.nombre,
    idCategoria:this.servicioSeleccionado.idCategoria,
    descripcionCategoria:this.servicioSeleccionado.descripcionCategoria,
    precio:this.servicioSeleccionado.precio,
    esActivo:this.servicioSeleccionado.esActivo
  })
  //this.listaServiciosAgregadosALaOrden=this.formularioServicioVenta.value.Servicios;
  console.log(this.listaServiciosAgregadosALaOrden)

  console.log(this.datosDetalleVenta.data);

  // Expected output: Array ["somestring", 42, false]
 const datosVenta={
  cantidad:_cantidad,
  precioTotal:_total,
  listaProductos: Object.values(this.datosDetalleVenta)
 } 

  this.dt=Object.values(this.datosDetalleVenta.data);
/*

  var usuarios=[
    {nombre:"Gino",puntaje:213},
    {nombre:"Nora",puntaje:250},
    {nombre:"Emily",puntaje:281},
    {nombre:"Jack",puntaje:69},
    {nombre:"Enrique",puntaje:213}
   ];
  
  for(var i=0;i<usuarios.length;i++){
    console.log("---------");
    console.log(usuarios[i].nombre);
    console.log(usuarios[i].puntaje);
  }
*/

  for(var i=0;i<this.dt.length;i++){
    console.log("---------");
    console.log(this.dt[i].cantidad);
    console.log(this.dt[i].descripcionServicio);
    console.log(this.dt[i].precioTexto);
    console.log(this.dt[i].totalTexto);
    if(i==0){
      this.serviceCantidad0=this.dt[i].cantidad;
      this.servicedescripcionServicio0=this.dt[i].descripcionServicio;
      this.serviceprecioTexto0=this.dt[i].cantidad;
      this.servicetotalTexto0=this.dt[i].totalTexto;
   }
   if(i==1){
    this.serviceCantidad1=this.dt[i].cantidad;
    this.servicedescripcionServicio1=this.dt[i].descripcionServicio;
    this.serviceprecioTexto1=this.dt[i].cantidad;
    this.servicetotalTexto1=this.dt[i].totalTexto;
   }
  if(i==2){
    this.serviceCantidad2=this.dt[i].cantidad;
    this.servicedescripcionServicio2=this.dt[i].descripcionServicio;
    this.serviceprecioTexto2=this.dt[i].cantidad;
    this.servicetotalTexto2=this.dt[i].totalTexto;
      }
  if(i==3){
    this.serviceCantidad3=this.dt[i].cantidad;
    this.servicedescripcionServicio3=this.dt[i].descripcionServicio;
    this.serviceprecioTexto3=this.dt[i].cantidad;
    this.servicetotalTexto3=this.dt[i].totalTexto;
      }

  }

}else{
  this._utilidadServicio.mostrarAlerta("Ingrese las pulgadas cuadradas","Error");
}


}

eliminarServicio(detalle:DetalleVenta){
  this.totalPagar=this.totalPagar-parseFloat(detalle.totalTexto),
  this.listaServiciosParaVenta=this.listaServiciosParaVenta.filter(p=>p.idServicio!=detalle.idServicio);
  this.listaServiciosAgregadosALaOrden=this.listaServicios.filter(p=>p.idServicio==detalle.idServicio);
  console.log(this.listaServiciosAgregadosALaOrden);
  
  this.datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);
  console.log()
}

validarTipoPago(){

  const totalIni=this.totalPagar;

  if(this.tipodePagoPorDefecto=="Efectivo"){
    alert("El pago en efectivo no cambia el valor total a pagar");
    console.log("El valor no ha cambiado");
    this.inicial=0;
    this.totalPagar=totalIni;


  }else if(this.tipodePagoPorDefecto=="CuotasConIni15"){
   const porcentaje=(this.totalPagar*15)/100;
   console.log(porcentaje+"Este es el 15%");
   this.totalPagar=this.totalPagar-porcentaje;

   this.inicial=porcentaje;
   console.log(this.inicial+"Este es el valor de cuota inicial");

  }else if(this.tipodePagoPorDefecto=="CuotasConIni25"){
    const porcentaje=(this.totalPagar*25)/100;
    this.inicial=porcentaje;
    console.log(porcentaje+"Este es el 25%");
    
    this.inicial=porcentaje;
    console.log(this.inicial+"Este es el valor de cuota inicial");
    this.totalPagar=this.totalPagar-porcentaje;


  }else if(this.tipodePagoPorDefecto=="CuotasConIni35"){
    const porcentaje=(this.totalPagar*35)/100;
    console.log(porcentaje+"Este es el 35%");
   this.totalPagar=this.totalPagar-porcentaje;

   this.inicial=porcentaje;
   console.log(this.inicial+"Este es el valor de cuota inicial");

  }else if(this.tipodePagoPorDefecto=="CuotasConIni45"){
    const porcentaje=(this.totalPagar*45)/100;
    console.log(porcentaje+"Este es el 45%");
   this.totalPagar=this.totalPagar-porcentaje;

   this.inicial=porcentaje;
   console.log(this.inicial+"Este es el valor de cuota inicial");

  }else{
    console.log("No se a cumplido con cuota, el valor es entero");
    console.log(this.inicial+"Este es el valor es cero");
   this.totalPagar=totalIni;
   this.inicial=0;
  }

  console.log(this.inicial);
  console.log(this.totalPagar);

  //const init=this.inicial.toFixed(0);

  this.formularioCotizacion.value.TipoPago=this.tipodePagoPorDefecto;
  this.formularioCotizacion.value.PagoInicialTexto=this.inicial;
  this.formularioCotizacion.value.TotalTexto=this.totalPagar;
  console.log(this.formularioCotizacion.value.TipoPago)
    console.log(this.formularioCotizacion.value.PagoInicialTexto);
}

//COMPONENTES DE LA GRAFICA 

onSelect(data): void {
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
}

onActivate(data): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}

//TERMINA COMPONENTES DE LA GRAFICA 

//EMPIEZA COMPONENTES DE LOS BOTONES FINANCING 


operacionFive(){
  this.totalPagar;
  this.interesxMes=(this.totalPagar*5)/100;
   this.comisiones=(this.totalPagar*2.5)/100;
  this.totalInteres=(this.interesxMes*60)+this.comisiones;
  this.valorCuota=(this.totalPagar/60)+this.interesxMes;
  this.ahorra=this.totalInteres;

  this.totalPagarTxt=this.totalPagar.toString().split('.');
  this.totalPagarTxt[0]=this.totalPagarTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalPagarTxt.join('.');
  this.totalInteresTxt=this.totalInteres.toString().split('.');
  this.totalInteresTxt[0]=this.totalInteresTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalInteresTxt.join('.');
  this.interesxMesTxt=this.interesxMes.toString().split('.');
  this.interesxMesTxt[0]=this.interesxMesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.interesxMesTxt.join('.');
  this.comisionesTxt=this.comisiones.toString().split('.');
  this.comisionesTxt[0]=this.comisionesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.comisionesTxt.join('.');
  this.valorCuotaTxt=this.valorCuota.toString().split('.');
  this.valorCuotaTxt[0]=this.valorCuotaTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.valorCuotaTxt.join('.');
  this.ahorraTxt=this.totalInteresTxt;

  this.tiempoFinancing=5;
  const ahorraRedondeado=this.ahorra.toFixed(0);
  this.ahorraTexto=ahorraRedondeado.toString();
  
  const valorInteresesRedondeado=this.totalInteres.toFixed(0);
  this.valorInteresesTexto=valorInteresesRedondeado.toString();
  const cuotaMensualRedondeado=this.valorCuota.toFixed(0);
  this.cuotaMensualTexto=cuotaMensualRedondeado.toString();
  
  const tiempoFinanciado=5;
  this.formularioCotizacion.value.TiempoFinancing=tiempoFinanciado;
  this.formularioCotizacion.value.AhorraTexto=this.ahorraTexto;
  this.formularioCotizacion.value.ValorInteresesTexto=this.valorInteresesTexto;
  this.formularioCotizacion.value.CuotaMensualTexto=this.cuotaMensualTexto;
  console.log(this.formularioCotizacion.value.TiempoFinancing);
  console.log(this.formularioCotizacion.value.AhorraTexto);
  console.log(this.formularioCotizacion.value.ValorInteresesTexto);
  console.log(this.formularioCotizacion.value.CuotaMensualTexto);


  this.data=DATA_BAR_CHART;

  setTimeout(()=>{
    console.log('*****');
    const dataValor={
      name:"VALOR",
      value:this.totalPagar
    };
    const dataIntereses={
      name:"INTERESES",
      value:this.totalInteres
    };
    const dataComisiones={
      name:"COMISIONES",
      value:this.comisiones
    };
    const dataImpuestos={
      name:"IMPUESTOS",
      value:375000
    };
    this.data=[...this.data,dataValor,dataIntereses,dataComisiones,dataImpuestos];
  },1500);

 
  
}

operacionTeen(){
  this.totalPagar;
  this.interesxMes=(this.totalPagar*5)/100;
   this.comisiones=(this.totalPagar*2.5)/100;
  this.totalInteres=(this.interesxMes*120)+this.comisiones;
  this.valorCuota=(this.totalPagar/120)+this.interesxMes;
  this.ahorra=this.totalInteres;
  this.totalPagarTxt=this.totalPagar.toString().split('.');
  this.totalPagarTxt[0]=this.totalPagarTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalPagarTxt.join('.');
  this.totalInteresTxt=this.totalInteres.toString().split('.');
  this.totalInteresTxt[0]=this.totalInteresTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalInteresTxt.join('.');
  this.interesxMesTxt=this.interesxMes.toString().split('.');
  this.interesxMesTxt[0]=this.interesxMesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.interesxMesTxt.join('.');
  this.comisionesTxt=this.comisiones.toString().split('.');
  this.comisionesTxt[0]=this.comisionesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.comisionesTxt.join('.');
  this.valorCuotaTxt=this.valorCuota.toString().split('.');
  this.valorCuotaTxt[0]=this.valorCuotaTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.valorCuotaTxt.join('.');
  this.ahorraTxt=this.totalInteresTxt;

  this.tiempoFinancing=10;
  const ahorraRedondeado=this.ahorra.toFixed(0);
  this.ahorraTexto=ahorraRedondeado.toString();
  const valorInteresesRedondeado=this.totalInteres.toFixed(0);
  this.valorInteresesTexto=valorInteresesRedondeado.toString();
  const cuotaMensualRedondeado=this.valorCuota.toFixed(0);
  this.cuotaMensualTexto=cuotaMensualRedondeado.toString();
  
  const tiempoFinanciado1=10;
  this.formularioCotizacion.value.TiempoFinancing=tiempoFinanciado1;
  this.formularioCotizacion.value.AhorraTexto=this.ahorraTexto;
  this.formularioCotizacion.value.ValorInteresesTexto=this.valorInteresesTexto;
  this.formularioCotizacion.value.CuotaMensualTexto=this.cuotaMensualTexto;
  console.log(this.formularioCotizacion.value.TiempoFinancing);
  console.log(this.formularioCotizacion.value.AhorraTexto);
  console.log(this.formularioCotizacion.value.ValorInteresesTexto);
  console.log(this.formularioCotizacion.value.CuotaMensualTexto);

  this.data=DATA_BAR_CHART;

  setTimeout(()=>{
    console.log('*****');
    const dataValor={
      name:"VALOR",
      value:this.totalPagar
    };
    const dataIntereses={
      name:"INTERESES",
      value:this.totalInteres
    };
    const dataComisiones={
      name:"COMISIONES",
      value:this.comisiones
    };
    const dataImpuestos={
      name:"IMPUESTOS",
      value:375000
    };
    this.data=[...this.data,dataValor,dataIntereses,dataComisiones,dataImpuestos];
  },1500);

  const tiempoFinanciado=10;
  this.formularioCotizacion.value.TiempoFinancing=tiempoFinanciado;
}
operacionTweetyFive(){
  this.totalPagar;
  this.interesxMes=(this.totalPagar*5)/100;
   this.comisiones=(this.totalPagar*2.5)/100;
  this.totalInteres=(this.interesxMes*148)+this.comisiones;
  this.valorCuota=(this.totalPagar/148)+this.interesxMes;
  this.ahorra=this.totalInteres;
  this.totalPagarTxt=this.totalPagar.toString().split('.');
  this.totalPagarTxt[0]=this.totalPagarTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalPagarTxt.join('.');
  this.totalInteresTxt=this.totalInteres.toString().split('.');
  this.totalInteresTxt[0]=this.totalInteresTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalInteresTxt.join('.');
  this.interesxMesTxt=this.interesxMes.toString().split('.');
  this.interesxMesTxt[0]=this.interesxMesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.interesxMesTxt.join('.');
  this.comisionesTxt=this.comisiones.toString().split('.');
  this.comisionesTxt[0]=this.comisionesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.comisionesTxt.join('.');
  this.valorCuotaTxt=this.valorCuota.toString().split('.');
  this.valorCuotaTxt[0]=this.valorCuotaTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.valorCuotaTxt.join('.');
  this.ahorraTxt=this.totalInteresTxt;

  this.tiempoFinancing=15;
  const ahorraRedondeado=this.ahorra.toFixed(0);
  this.ahorraTexto=ahorraRedondeado.toString();

  const valorInteresesRedondeado=this.totalInteres.toFixed(0);
  this.valorInteresesTexto=valorInteresesRedondeado.toString();
  const cuotaMensualRedondeado=this.valorCuota.toFixed(0);
  this.cuotaMensualTexto=cuotaMensualRedondeado.toString();


  const tiempoFinanciado=15;
  this.formularioCotizacion.value.TiempoFinancing=tiempoFinanciado;
  this.formularioCotizacion.value.AhorraTexto=this.ahorraTexto;
  this.formularioCotizacion.value.ValorInteresesTexto=this.valorInteresesTexto;
  this.formularioCotizacion.value.CuotaMensualTexto=this.cuotaMensualTexto;
  console.log(this.formularioCotizacion.value.TiempoFinancing);
  console.log(this.formularioCotizacion.value.AhorraTexto);
  console.log(this.formularioCotizacion.value.ValorInteresesTexto);
  console.log(this.formularioCotizacion.value.CuotaMensualTexto);


  this.data=DATA_BAR_CHART;

  setTimeout(()=>{
    console.log('*****');
    const dataValor={
      name:"VALOR",
      value:this.totalPagar
    };
    const dataIntereses={
      name:"INTERESES",
      value:this.totalInteres
    };
    const dataComisiones={
      name:"COMISIONES",
      value:this.comisiones
    };
    const dataImpuestos={
      name:"IMPUESTOS",
      value:375000
    };
    this.data=[...this.data,dataValor,dataIntereses,dataComisiones,dataImpuestos];
  },1500);

}
separadorMiles()
{
  this.totalPagarTxt=this.totalPagar.toString().split('.');
  this.totalPagarTxt[0]=this.totalPagarTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalPagarTxt.join('.');
  this.totalInteresTxt=this.totalInteres.toString().split('.');
  this.totalInteresTxt[0]=this.totalInteresTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalInteresTxt.join('.');
  this.interesxMesTxt=this.interesxMes.toString().split('.');
  this.interesxMesTxt[0]=this.interesxMesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.interesxMesTxt.join('.');
  this.comisionesTxt=this.comisiones.toString().split('.');
  this.comisionesTxt[0]=this.comisionesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.comisionesTxt.join('.');
  this.valorCuotaTxt=this.valorCuota.toString().split('.');
  this.valorCuotaTxt[0]=this.valorCuotaTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.valorCuotaTxt.join('.');
  this.ahorraTxt=this.totalInteresTxt;
  //let partesNumero=numero.toString().split('.');
  //partesNumero[0]=partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  //partesNumero.join('.');

  
}
//TERMINA COMPONENTES DE FINANCING

//COMPARACION ENERGIA SOLAR


comparacionFactura(){
  this.facturaEE
  //porcentaje de incremento anual
  this.porcentajeIA
  const valorAnual=this.facturaEE*12;
  const porcentajexAño=(valorAnual*this.porcentajeIA)/100;
  console.log(porcentajexAño+"Este es el pocentaje%");
  this.totalEE=valorAnual;
  const totalEETeen=(valorAnual+porcentajexAño)*10;
  const totalEEFifteen=(valorAnual+porcentajexAño)*15;
  const totalEEThirty=(valorAnual+porcentajexAño)*30;
  

  

}
operacionTeenSolar(){
  //porcentaje de incremento anual
  const valorAnual=this.facturaEE*12;
  const porcentajexAño=(valorAnual*this.porcentajeIA)/100;
  console.log(porcentajexAño+"Este es el pocentaje%");
  const totalEETeen=(valorAnual+porcentajexAño)*10;
  console.log(totalEETeen+"Este es el pocentaje%");
  this.totalEE=totalEETeen;
  this.totalEETxt=this.totalEE.toString().split('.');
  this.totalEETxt[0]=this.totalEETxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalEETxt.join('.');

 
}
operacionFifteen(){
  //porcentaje de incremento anual
  const valorAnual=this.facturaEE*12;
  const porcentajexAño=(valorAnual*this.porcentajeIA)/100;
  console.log(porcentajexAño+"Este es el pocentaje%");
  const totalEEFifteen=(valorAnual+porcentajexAño)*15;
  console.log(totalEEFifteen+"Este es el pocentaje%");
  this.totalEE=totalEEFifteen;
  this.totalEETxt=this.totalEE.toString().split('.');
  this.totalEETxt[0]=this.totalEETxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalEETxt.join('.');
}
operacionThirty(){
  //porcentaje de incremento anual
  const valorAnual=this.facturaEE*12;
  const porcentajexAño=(valorAnual*this.porcentajeIA)/100;
  console.log(porcentajexAño+"Este es el pocentaje%");
  const totalEEThirty=(valorAnual+porcentajexAño)*30;
  console.log(totalEEThirty+"Este es el pocentaje%");
  this.totalEE=totalEEThirty;
  this.totalEETxt=this.totalEE.toString().split('.');
  this.totalEETxt[0]=this.totalEETxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  this.totalEETxt.join('.');

}
operacionCuotasEE(){
  
  function calcularCuotas(): number[] {
    this.cuotaInicial=this.facturaEE;
    this.tasaIncrementoAnual=this.porcentajeIA;
    this.numeroAnios=10;
    const cuotas: number[] = [];

    for (let anio = 1; anio <= numeroAnios; anio++) {
        for (let mes = 1; mes <= 12; mes++) {
            const cuotaMensual = cuotaInicial / 12;
            cuotas.push(cuotaMensual);
        }

        // Al final de cada año, actualiza la cuota inicial con el incremento anual
        this.cuotaInicial *= 1 + tasaIncrementoAnual / 100;
    }

    return cuotas;
}

// Ejemplo de uso
const cuotaInicial: number = 1000;  // Coloca aquí el valor inicial de la cuota
const tasaIncrementoAnual: number = 5;  // Coloca aquí el porcentaje de incremento anual
const numeroAnios: number = 5;  // Número total de años para proyectar

const cuotasMensuales: number[] = calcularCuotas();

for (let i = 0; i < cuotasMensuales.length; i++) {
    console.log(`Mes ${i + 1}: $${cuotasMensuales[i].toFixed(2)}`);
}

}


 calcularCuotas(){

      const cuotas: number[] = []; // Declara un array vacío
      const cuotasES: number[] = [];

      

      


      // Utiliza un ciclo for para llenar el array
      // for (let i = 0; i < 10; i++) {
      //     array.push(i)
      //     ;
      // }
      this.cuotaInicial=this.facturaEE*12;
      this.tasaIncrementoAnual=this.porcentajeIA;

        for (let anio = 1; anio <=10; anio++) {
          for (let mes = 1; mes <= 12; mes++) {
              const cuotaMensual = this.cuotaInicial / 12;
            //  console.log(mes);
              cuotas.push(cuotaMensual);
          }

          // Al final de cada año, actualiza la cuota inicial con el incremento anual
          this.cuotaInicial *= 1 + this.tasaIncrementoAnual / 100;
      }

      console.log("En el ultimo año, pagará un total de"+this.cuotaInicial+"  Dolares ");
      console.log(this.tasaIncrementoAnual);
      this.totalPagosAnuales=Math.round(this.cuotaInicial);
      console.log("En 10 años el valor de su cuota mensual sufrira una serie de incrementos, proyectandose en un valor de "+cuotas[cuotas.length - 1]+"  Dolares");
   

      const ultimaCuota=Math.round(cuotas[cuotas.length - 1]);
      this.cuotasMensualesEETxt=ultimaCuota.toString().split('.');
      this.cuotasMensualesEETxt[0]=this.cuotasMensualesEETxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
      this.cuotasMensualesEETxt.join('.');

      this.totalPagosAnualesTxt=this.totalPagosAnuales.toString().split('.');
      this.totalPagosAnualesTxt[0]=this.totalPagosAnualesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
      this.totalPagosAnualesTxt.join('.');

      const kWh=(this.cuotaInicial*0.18)/1;
      this.cuotasMensualesES=Math.round(kWh*0.061);

      

      console.log(this.totalPagosAnuales+" Este anterior es el total cancelado en pagos anuales en energia electrica");

      this.pagoElectricidadTexto=this.facturaEE.toString();
      this.porcentajeIncremento=this.porcentajeIA;
      this.mensualAproxTexto=this.cuotasMensualesEETxt.toString();
      this.valorPagadoTexto=this.totalPagosAnualesTxt.toString();
      this.proyeccionSolarTexto=this.cuotasMensualesES.toString();
      this.tiempoSolar=10;

      //const pagoEE=this.facturaEE.toFixed(0);
     /* const incrementoAnual=this.porcentajeIA.toFixed(0);
      const mensualAprox=this.cuotasMensualesEE.toFixed(0);
      const habraPagado=this.totalPagosAnuales.toFixed(0);
      const pagoES=this.cuotasMensualesES.toFixed(0);*/
      const tiempoSolar=10;

      const pagos=this.totalPagosAnuales.toFixed(0);
      const cuotaMensualEEAproximado=ultimaCuota.toFixed(0);

      this.formularioCotizacion.value.PagoElectricidadTexto=this.pagoElectricidadTexto;
      this.formularioCotizacion.value.PorcentajeIncremento=this.porcentajeIncremento;
      this.formularioCotizacion.value.MensualAproxTexto=cuotaMensualEEAproximado.toString();
      this.formularioCotizacion.value.ValorPagadoTexto=pagos.toString();
      this.formularioCotizacion.value.ProyeccionSolarTexto=this.proyeccionSolarTexto;
      this.formularioCotizacion.value.TiempoSolar=tiempoSolar;

      console.log(this.formularioCotizacion.value.PagoElectricidadTexto);
      console.log(this.formularioCotizacion.value.PorcentajeIncremento);
      console.log(this.formularioCotizacion.value.MensualAproxTexto);
      console.log(this.formularioCotizacion.value.ValorPagadoTexto);
      console.log(this.formularioCotizacion.value.ProyeccionSolarTexto);
      console.log(this.formularioCotizacion.value.TiempoSolar);

    }
    calcularCuotas15(){

      const cuotas: number[] = []; // Declara un array vacío
      const cuotasES: number[] = [];
      this.cuotaInicial=this.facturaEE*12;
      this.tasaIncrementoAnual=this.porcentajeIA;

        for (let anio = 1; anio <=15; anio++) {
          for (let mes = 1; mes <= 12; mes++) {
              const cuotaMensual = this.cuotaInicial / 12;
             // console.log(mes);
              cuotas.push(cuotaMensual);
          }

          // Al final de cada año, actualiza la cuota inicial con el incremento anual
          this.cuotaInicial *= 1 + this.tasaIncrementoAnual / 100;
      }
      console.log("En el ultimo año, pagará un total de"+this.cuotaInicial+"  Dolares ");
      console.log(this.tasaIncrementoAnual);
      this.totalPagosAnuales=Math.round(this.cuotaInicial);
      console.log("En 10 años el valor de su cuota mensual sufrira una serie de incrementos, proyectandose en un valor de "+cuotas[cuotas.length - 1]+"  Dolares");

      const ultimaCuota=Math.round(cuotas[cuotas.length - 1]);
      this.cuotasMensualesEETxt=ultimaCuota.toString().split('.');
      this.cuotasMensualesEETxt[0]=this.cuotasMensualesEETxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
      this.cuotasMensualesEETxt.join('.');

      this.totalPagosAnualesTxt=this.totalPagosAnuales.toString().split('.');
      this.totalPagosAnualesTxt[0]=this.totalPagosAnualesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
      this.totalPagosAnualesTxt.join('.');

      const kWh=(this.cuotaInicial*0.18)/1;
      this.cuotasMensualesES=Math.round(kWh*0.061);

      

      console.log(this.totalPagosAnuales+" Este anterior es el total cancelado en pagos anuales en energia electrica")

      this.pagoElectricidadTexto=this.facturaEE.toString();
      this.porcentajeIncremento=this.tasaIncrementoAnual;
      this.mensualAproxTexto=this.cuotasMensualesEETxt.toString();
      this.valorPagadoTexto=this.totalPagosAnualesTxt.toString();
      this.proyeccionSolarTexto=this.cuotasMensualesES.toString();
      this.tiempoSolar=15;
  }
  calcularCuotas30(){

    const cuotas: number[] = []; // Declara un array vacío
    const cuotasES: number[] = [];
    this.cuotaInicial=this.facturaEE*12;
    this.tasaIncrementoAnual=this.porcentajeIA;

      for (let anio = 1; anio <=30; anio++) {
        for (let mes = 1; mes <= 12; mes++) {
            const cuotaMensual = this.cuotaInicial / 12;
            //console.log(mes);
            cuotas.push(cuotaMensual);
        }

        // Al final de cada año, actualiza la cuota inicial con el incremento anual
        this.cuotaInicial *= 1 + this.tasaIncrementoAnual / 100;
    }
    console.log("En el ultimo año, pagará un total de"+this.cuotaInicial+"  Dolares ");
    console.log(this.tasaIncrementoAnual);
    this.totalPagosAnuales=Math.round(this.cuotaInicial);
    console.log("En 10 años el valor de su cuota mensual sufrira una serie de incrementos, proyectandose en un valor de "+cuotas[cuotas.length - 1]+"  Dolares");
  

    const ultimaCuota=Math.round(cuotas[cuotas.length - 1]);
    this.cuotasMensualesEETxt=ultimaCuota.toString().split('.');
    this.cuotasMensualesEETxt[0]=this.cuotasMensualesEETxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
    this.cuotasMensualesEETxt.join('.');

    this.totalPagosAnualesTxt=this.totalPagosAnuales.toString().split('.');
    this.totalPagosAnualesTxt[0]=this.totalPagosAnualesTxt[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
    this.totalPagosAnualesTxt.join('.');

    const kWh=(this.cuotaInicial*0.18)/1;
    this.cuotasMensualesES=Math.round(kWh*0.061);

    

    console.log(this.totalPagosAnuales+" Este anterior es el total cancelado en pagos anuales en energia electrica");
    this.pagoElectricidadTexto=this.facturaEE.toString();
    this.porcentajeIncremento=this.porcentajeIA;
    this.mensualAproxTexto=this.cuotasMensualesEETxt.toString();
    this.valorPagadoTexto=this.totalPagosAnualesTxt.toString();
    this.proyeccionSolarTexto=this.cuotasMensualesES.toString();
    this.tiempoSolar=30;
  }
//TERMINA ENERGIA SOLAR


//EMPIEZA MODULOS DEL PDF

    //PDF AQUI COMIENZA
    enviar_Email(){

      this.serviceCantidad0;
      this.servicedescripcionServicio0;
      this.serviceprecioTexto0;
      this.servicetotalTexto0;

      this.serviceCantidad1;
      this.servicedescripcionServicio1;
      this.serviceprecioTexto1;
      this.servicetotalTexto1;

      this.serviceCantidad2;
      this.servicedescripcionServicio2;
      this.serviceprecioTexto2;
      this.servicetotalTexto2;

      this.serviceCantidad3;
      this.servicedescripcionServicio3;
      this.serviceprecioTexto3;
      this.servicetotalTexto3;
  

      

      var pago=this.totalPagar.toString().split('.');
      pago[0]=pago[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
      pago.join('.');

      const _email:Email={
        
        para:this.formularioEmail.value.para,
        asunto:"Cotizacion NRO Home Energy",

        contenido:"<!DOCTYPE html><html xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office' lang='en'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Gracias por confiar en nosotros</title><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><style>*{box-sizing: border-box;}.sen {font-family: 'Sen', Sen, 'Sen', sans-serif;font-optical-sizing: auto;}.textLigth {font-family: 'AvenirLTPro';font-size: 28px;line-height: 34px;}.textBlack {font-family: 'AvenirLTProBlack';font-size: 35px;}.textCursiva {font-family: 'EldwinTrial-ScriptRegular';font-size: 35px;}body {margin: 0;padding: 0;}a[x-apple-data-detectors] {color: inherit !important;text-decoration: inherit !important;}#MessageViewBody a {color: inherit;text-decoration: none;}p{line-height: inherit}.desktop_hide,.desktop_hide table {mso-hide: all;display: none;max-height: 0px;overflow: hidden;}.image_block img+div {display: none;}@media (max-width:920px) {.desktop_hide table.icons-inner,.social_block.desktop_hide .social-table {display: inline-block !important;}.icons-inner {text-align: center;}.icons-inner td {margin: 0 auto; }.image_block img.big, .row-content {width: 100% !important;}.mobile_hide {display: none;}.stack .column {width: 100%;display: block;}.mobile_hide {min-height: 0;max-height: 0;max-width: 0;overflow: hidden;font-size: 0px;}.desktop_hide,.desktop_hide table {display: table !important;max-height: none !important;}}</style></head><body style='background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;'><table class='nl-container' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;'role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td><table class='row row-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' role='presentation' border='0'width='100%' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td><table class='row-content stack'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 900px;'role='presentation' border='0' width='900' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td class='column column-1'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border: 0px;'width='100%'><table class='image_block block-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td><div class='alignment' style='line-height: 10px;' align='center'><p style='outline: none; color: transparent;'>Tenemos beneficios para t&iacute;, hemos realizado alianzas estrat&eacute;gicas para que puedas disfrutar de ser parte deconsultores especializados</p></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-2' style='background-color: #ffffff; height: 724.141px;' role='presentation' border='0'width='100%' cellspacing='0' cellpadding='0' align='center'><tbody><tr style='height: 724.141px;'><td style='height: 724.141px;'><table class='row-content stack'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 900px;'role='presentation' border='0' width='900' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td class='column column-1'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border: 0px;' width='100%'><table class='image_block block-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td class='pad' style='width: 100%; padding-right: 0px; padding-left: 0px;'><div class='alignment' style='line-height: 10px;' align='center'><img class='big'style='display: block; height: auto; padding-top: 40px; padding-bottom: 40px; border: 0; width: 900px; max-width: 100%;'title='clientes de' src='https://projecta.com.co/Banner1HomeEnergy' alt='Image'width='900' /></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-2' align='center' width='100%' border='0' cellpadding='0' cellspacing='0'role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;'><tbody><tr><td><table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0'role='presentation'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 900px;' width='900'><tbody><tr><td class='column column-1' width='100%'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'><table class='image_block block-1' width='100%' border='0' cellpadding='0' cellspacing='0'role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr><td class='pad' style='width:100%;padding-right:0px;padding-left:0px;'><div class='alignment' align='center' style='line-height:10px'><h1 style='padding-right: 100px;padding-left: 100px;'>GRACIAS!</h1><h1 style='padding-left: 0px;padding-top: 100PX;'>SERVICIOS</h1><div align='left'><h3 style='padding-right: 100px;font-size:18px;'>PULGADAS</h3><p style='font-size:18px;'>"+this.serviceCantidad0+"</p><br><h3 style='padding-right: 100px;'>DESCRIPCIÓN</h3><br><p style='padding-right: 100px;'>"+this.servicedescripcionServicio0+"</p><br><p style='padding-right: 100px;'>"+'     '+this.servicedescripcionServicio1+"</p><br><p style='padding-right: 100px;'>"+'    '+this.servicedescripcionServicio2+"</p><br><p style='padding-right: 100px;'>"+'  '+this.servicedescripcionServicio3+"</p><br><h3 style='padding-right: 100px;'> TOTAL A PAGAR</h3>"+'  '+"<p style='padding-left: 100px;'>"+pago+"</p></div><br><br></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-2' style='background-color: #ffffff;' role='presentation' border='0' width='100%'cellspacing='0' cellpadding='0' align='center'><tbody><tr><td><table class='row-content stack'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 900px;' role='presentation' border='0' width='900' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td class='column column-1'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border: 0px;'width='100%'><table class='image_block block-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td class='pad' style='width: 100%; padding-right: 0px; padding-left: 0px;'><div class='alignment' style='line-height: 10px;' align='center'><img class='big' style='display: block; height: auto; padding-top: 20px; padding-bottom: 0px; border: 0; width: 900px; max-width: 100%;'title='clientes de' src='https://projecta.com.co/BannerFooter3HomeEnergy' alt='Image' width='900' /></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-2' style='width: 905px;' role='presentation' border='0' width='100%' cellspacing='0'cellpadding='0' align='center'><tbody><tr><td style='width: 904px;'><table class='row-content stack'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #a0fa00; width: 900px;'role='presentation' border='0' width='900' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td class='column column-1'style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border: 0px;'width='100%'><table class='social_block block-2' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td class='pad'style='padding-bottom: 10px; padding-left: 0px; padding-right: 0px; text-align: center; background-color: #a0fa00;'><div class='alignment' align='center'>&nbsp;</div><hr style='width: 80%; color: #000;' /><p class='sen' style='padding-top: 20px; color: #000;'>*Obten descuentos y participa de sorteos con nuestro sistema de referidos</p><button style='width: 30%;height: 50px;background-color: #ffffff;border: none;' href='https://nvhomeenergy.com/' style='padding-top: 20px; color: #000'>Clickea AQUI</button><div class='alignment' style='line-height: 10px; padding-top: 20px;' align='center'><a style='color: #000; text-decoration: none; font-size: 18px; padding-top: 20px;'href='https://nvhomeenergy.com/' target='_blank' rel='noopener'>Dejanos tus comentarios</a><p class='sen' style='padding-top: 20px;'>Derechos reservados</p><div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>"
      
        //contenido:this.templateEmail
      }
      if(this.formularioEmail!=null){
  
       this._emailServicio.enviar(_email).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El email fue enviado","Exito");
            this.modalActual.close("true")
          }else
          this._utilidadServicio.mostrarAlerta("No se pudo enviar el email","Error")
        },
        error:(e)=>{}
       })
      }else{
        alert("No entro a el if: aglo mal en formulario email");
      }
     }
   //PDF ENVIAR AL CORREO ELECTRONICO, AQUI TERMINA FUNCION
   //AQUI EMPIEZA LAS FUNCIONES ADICIONALES DE LA CARGA DE IMAGENES PARA LA CREACION DEL PDF

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

   //CAPTURA DE IMAGENES PARA PDF 1
   capturarFile1(event):any{


    const archivoCapturado=event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
     this.previsualizacion1=imagen.base;
     console.log(imagen);
    })
    this.archivos.push(archivoCapturado);
    const datos = [this.archivos.map((item, index) => {
      console.log('posicion array:', index, item)
                  return item
    })]
 }
 //TERMINA FUNCION 1
//CAPTURA DE IMAGENES PARA PDF 2
 capturarFile2(event):any{


  const archivoCapturado=event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
   this.previsualizacion2=imagen.base;
   console.log(imagen);
  })
  this.archivos.push(archivoCapturado);
  const datos = [this.archivos.map((item, index) => {
    console.log('posicion array:', index, item)
                return item
  })]

}
//TERMINA FUNCION 2
//CAPTURA DE IMAGENES PARA PDF 3
capturarFile3(event):any{


  const archivoCapturado=event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
   this.previsualizacion3=imagen.base;
   console.log(imagen);
  })
  this.archivos.push(archivoCapturado);
  const datos = [this.archivos.map((item, index) => {
    console.log('posicion array:', index, item)
                return item
  })]

}
//TERMINA FUNCION 3
//CAPTURA DE IMAGENES PARA PDF 4
capturarFile4(event):any{


  const archivoCapturado=event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
   this.previsualizacion4=imagen.base;
   console.log(imagen);
  })
  this.archivos.push(archivoCapturado);
  const datos = [this.archivos.map((item, index) => {
    console.log('posicion array:', index, item)
                return item
  })]

}
//TERMINA FUNCION 4
//CAPTURA DE IMAGENES PARA PDF 5
capturarFile5(event):any{


  const archivoCapturado=event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
   this.previsualizacion5=imagen.base;
   console.log(imagen);
  })
  this.archivos.push(archivoCapturado);
  const datos = [this.archivos.map((item, index) => {
    console.log('posicion array:', index, item)
                return item
  })]

}
//TERMINA FUNCION 5
//CAPTURA DE IMAGENES PARA PDF 6
capturarFile6(event):any{


  const archivoCapturado=event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
   this.previsualizacion6=imagen.base;
   console.log(imagen);
  })
  this.archivos.push(archivoCapturado);
  const datos = [this.archivos.map((item, index) => {
    console.log('posicion array:', index, item)
                return item
  })]

}
resetTotalPagar(){
  this.totalPagar=0;
}

//TERMINA FUNCION 6
   //AQUI TERMINA LAS FUNCIONES DE CARGA DE IMAGENES

//EMPIEZA CREADOR PDF
//PDF AQUI COMIENZA
async crearPDF(){
  
  console.log("ENTRO A CREAR PDF");

  const imagenPortada=this.previsualizacion1;
  const image2=this.previsualizacion2;
  const image3=this.previsualizacion3;
  const image4=this.previsualizacion4;
  const firmaCliente=this.previsualizacion5;
  const firmaHomeEnergy=this.previsualizacion6;

  let firtName:string =this.itemProspecto.nombre;
  let direction:string =this.itemProspecto.direccion;
  let number:string =this.itemProspecto.contacto;
  let datetime:string =this.itemProspecto.detalle;
  let auditor:string =this.itemProspecto.idauditor.toString();
  //let numeroVenta:string ='0005';

 let  listaServiciosParaVenta:DetalleVenta[]=[];
 let datosDetalleVenta=new MatTableDataSource(listaServiciosParaVenta);

 var dataServicesAdd=[
  {cantidad:20,descripcionServicio:"ATTILNC SOLUCTION",precioTexto:"250",totalTexto:"5858"},
  {cantidad:20,descripcionServicio:"ROOF",precioTexto:"250",totalTexto:"5858"},
  {cantidad:20,descripcionServicio:"H3",precioTexto:"250",totalTexto:"5858"},
  {cantidad:20,descripcionServicio:"H4",precioTexto:"250",totalTexto:"5858"}
 ];

 this.datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);


console.log(this.datosDetalleVenta.data);
 
 dataServicesAdd=this.listaServiciosParaVenta;

  var serviceCantidad0=0;
  var servicedescripcionServicio0="Nombre";
  var serviceprecioTexto0="Precio";
  var servicetotalTexto0="Total";

  var serviceCantidad1=0;
  var servicedescripcionServicio1="Nombre";
  var serviceprecioTexto1="Precio";
  var servicetotalTexto1="Total";

  var serviceCantidad2=0;
  var servicedescripcionServicio2="Nombre";
  var serviceprecioTexto2="Precio";
  var servicetotalTexto2="Total";

  var serviceCantidad3=0;
  var servicedescripcionServicio3="Nombre";
  var serviceprecioTexto3="Precio";
  var servicetotalTexto3="Total";

for(var i=0;i<dataServicesAdd.length;i++){
  console.log("---------");
  console.log(dataServicesAdd[i].cantidad);
  console.log(dataServicesAdd[i].descripcionServicio);
  console.log(dataServicesAdd[i].precioTexto);
  console.log(dataServicesAdd[i].totalTexto);
  if(i==0){
    
    servicedescripcionServicio0=dataServicesAdd[i].descripcionServicio;
    serviceCantidad0=dataServicesAdd[i].cantidad;
    serviceprecioTexto0=dataServicesAdd[i].precioTexto;
    servicetotalTexto0=dataServicesAdd[i].totalTexto;
    }
    if(i==1){
     
      servicedescripcionServicio1=dataServicesAdd[i].descripcionServicio;
      serviceCantidad1=dataServicesAdd[i].cantidad;
      serviceprecioTexto1=dataServicesAdd[i].precioTexto;
      servicetotalTexto1=dataServicesAdd[i].totalTexto;
    }
    if(i==2){
      
      servicedescripcionServicio2=dataServicesAdd[i].descripcionServicio;
      serviceCantidad2=dataServicesAdd[i].cantidad;
      serviceprecioTexto2=dataServicesAdd[i].precioTexto;
      servicetotalTexto2=dataServicesAdd[i].totalTexto;
        }
    if(i==3){
      
      servicedescripcionServicio3=dataServicesAdd[i].descripcionServicio;
      serviceCantidad3=dataServicesAdd[i].cantidad;
      serviceprecioTexto3=dataServicesAdd[i].precioTexto;
      servicetotalTexto3=dataServicesAdd[i].totalTexto;
        }

    }

    let username: string = "codingpotions";
    const data = [    ['Name', 'Email', 'Country'],
    [auditor, 'johndoe@example.com', 'USA'],
    ['Jane Smith', 'janesmith@example.com', 'Canada'],
    ['Bob Johnson', 'bobjohnson@example.com', 'UK']
  ];

  const dataServices = [    ['Servicio', 'Pulgadas2', 'Precio x pulgada','Total'],
    [servicedescripcionServicio0,serviceCantidad0, serviceprecioTexto0,servicetotalTexto0],
    [servicedescripcionServicio1,serviceCantidad1, serviceprecioTexto1,servicetotalTexto1],
    [servicedescripcionServicio2,serviceCantidad2, serviceprecioTexto2,servicetotalTexto2],
    [servicedescripcionServicio3,serviceCantidad3, serviceprecioTexto3,servicetotalTexto3]
  ];

  const totalPagarTxt='totalPagarTxt';

  const totalInteresTxt='totalInteresTxt';

  const interesxMesTxt='interesxMesTxt';

  const comisionesTxt='comisionesTxt';

  const valorCuotaTxt='valorCuotaTxt';


  const ahorraTxt='ahorraTxt';

  

  //EXPORT GRAFICA


console.log("CREANDO PDF");
  const docDefinition:any= {
    content:[
      {image: 'data:image/png;base64,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',
       width: 250,
       height: 70,
       margin: [0, 0, 0, 15]
      },
      {image: 'data:image/png;base64,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',
       width: 500,
       height: 10},
      {image: 'data:image/jpeg,'+imagenPortada,
       width: 500,
       height: 500,
       margin: [15, 0, 0, 15]},
      {image: 'data:image/png;base64,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',
       width: 500,
       height: 10,
       margin: [0, 0, 0, 15]},
       {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Propuesta para:'
            
          },
          {
            // percentage width
            width: '50%',
            text:firtName
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Dirección'
            
          },
          {
            // percentage width
            width: '50%',
            text:direction
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Numero de teléfono'
            
          },
          {
            // percentage width
            width: '50%',
            text:number
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Fecha'
            
          },
          {
            // percentage width
            width: '50%',
            text:datetime
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Auditor'
            
          },
          {
            // percentage width
            width: '50%',
            margin: [0, 0, 0, 100],
            text:auditor
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      { text: 'Energy Efficient Report',style: 'section1'},
      { table: { 

        widths: ['*', 'auto', 100, '*'],

        body: dataServices
      }},
      {text: "This is an agreement that all work described on this report will be completed. Customer understands the timeline in which jobs will be completed as explained by the representative.",margin: [0, 20, 0, 20]},
      { text: 'Report financing',style: 'section1'},
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'TOTAL A PAGAR'
            
          },
          {
            // percentage width
            width: '50%',
            text:this.totalPagarTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'TOTAL INTERES'
            
          },
          {
            // percentage width
            width: '50%',
            text:this.totalInteresTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'TOTAL INTERES X MES'
            
          },
          {
            // percentage width
            width: '50%',
            text:this.interesxMesTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'COMISIONES'
            
          },
          {
            // percentage width
            width: '50%',
            text:this.comisionesTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'VALOR PROMEDIO DE LA CUOTA'
            
          },
          {
            // percentage width
            width: '50%',
            text:this.valorCuotaTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'VALOR AHORRADO'
            
          },
          {
            // percentage width
            width: '50%',
            text:this.ahorraTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },

      { text: 'Release of reability',style: 'section1',margin: [0, 0, 0, 20]},
      {text: [
        { text: 'This General Release (this “Release”) is made on', fontSize: 14},'   '+
        this.date+'   ',
        { text: 'between', fontSize: 14},'   '+
        this.itemProspecto.nombre,'  and  '+'Home Energy.'
      ],margin: [0, 0, 0, 20]},
      {text:'1. Releasor and anyone claiming on behalf of Releasor releases and forever discharges Releasee and its af/liates, successors and assigns, of/cers, employees, representatives, partners, agents and anyone claiming through them (collectively, the  Released Parties”), in their individual and3or corporate capacities from any and all claims outside the scope of Solar installation and liabilities, obligations, promises, agreements, disputes, demands, damages, causes of action of any nature and kind, known or unknown, which Releasor has or ever had or may in the future have against Releasee or any of the Released Parties arising out of or relating to: Adders to the system outside the scope of Solar Installation.(“Claims”).',margin: [0, 0, 0, 20]},

      {text:'2. This Release shall not be in any way construed as an admission by the Releasee that it has acted  wrongfully with respect to Releasor or any other person, that it admits liability or responsibility at anytime for any purpose, or that Releasor has any rights whatsoever against the Releasee.',margin: [0, 0, 0, 20]},

      {text:'3. This Release shall be binding upon and inure to the bene/t of the parties and their respective heirs administrators, personal representatives, executors, successors and assigns. Releasor has the authority to release the Claims and has not assigned or transferred any Claims to any other party. The provisions of this Release are severable. If any provision is held to be invalid or unenforceable, it shall not affect the validity or enforceability of any other provision. This Release constitutes the entire agreement between the parties and supersedes any and all prior oral or written agreements or understandings between the parties concerning the subject matter of this Release. This Release may not be altered, amended or modi/ed, except by a written document signed by both parties. The terms of this Release shall be governed by and construed in accordance with the laws of the State3Commonwealth of Home energy.',margin: [0, 0, 0, 20]},

      {text:'4. Both parties represent they fully understand their right to review all aspects of this Release with attorneys of their choice, that they have had the opportunity to consult with attorneys of their choice, that they have carefully read and fully understand all the provisions of this Release and that they are freely, knowingly and voluntarily entering into this Release.',margin: [0, 0, 0, 20]},

      {text:'Customer Signature:', fontSize: 14},

      {image: 'data:image/jpeg,'+firmaCliente,
       width: 200,
       height: 200,
       margin: [15, 0, 0, 550]},
      {image: 'data:image/png;base64,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',
       width: 500,
       height: 10,margin: [0, 0, 0, 20]},
       { text: 'Additional Adders Completion Agreement', fontSize: 20,margin: [0, 0, 0, 20]},

       { text: 'Customer information:', fontSize: 20,margin: [0, 0, 0, 20]},

       {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Name:'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.itemProspecto.nombre
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Telephone'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.itemProspecto.contacto
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Email'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.formularioCotizacion.value.Email
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Address'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.itemProspecto.direccion
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Identificacion'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.formularioCotizacion.value.Identificacion
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Soc/Ein'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.formularioCotizacion.value.SocEin
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Tamaño del Sistema'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.formularioCotizacion.value.TamanoSistema
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Pago Total'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.formularioCotizacion.value.TotalTexto
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Pago Inicial'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.formularioCotizacion.value.PagoInicialTexto
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      { text: 'Incentive/Adders Descriptions', fontSize: 20,margin: [0, 0, 0, 20]},
      { text: 'The Undersigned parties agree to the installation of the renewable energy system described in the home Installation Contract. Additionally, the Undersigned parties agree to the ful/llment of any additional equipament described above, whether by issuing payment or physical installation of adders. +y signing this document the home owner is stating that all additional eOuipment3adders and incentives have been ful/lled or paid for. There are no other promises, conditions, understandings or other agreements, whether oral or written, relating to the subject matter of this Agreement.', fontSize: 14,margin: [0, 0, 0, 20]},
      { text: 'Home Energy Rep Signature:', fontSize: 14,margin: [0, 0, 0, 20]},
      {image: 'data:image/jpeg,'+ firmaHomeEnergy,
       height: 100,
       width:100,
       margin: [0, 100, 0, 150]},
       {image: 'data:image/png;base64,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',
       width: 500,
       height: 10,margin: [0, 0, 0, 20]},
       { text: 'Assesment', fontSize: 20,margin: [0, 0, 0, 20]},
       { text: 'Notas', fontSize: 14,margin: [0, 0, 0, 20]},
       { text:this.formularioCotizacion.value.Notas, fontSize: 14,margin: [0, 0, 0, 20]},

       { text: 'Multimedia adicional:', fontSize: 20,margin: [0, 0, 0, 20]},
       {image: 'data:image/jpeg,'+ image2,
       height: 400,
       width:300,
       margin: [0, 10, 0, 10]},
       {image: 'data:image/jpeg,'+ image3,
       height: 400,
       width:300,
       margin: [0, 10, 0, 10]},
      {image: 'data:image/jpeg,'+ image4,
       height: 400,
       width:300,
       margin: [0, 10, 0, 10]},
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 0] },
      section1: { fontSize: 28, bold: true, margin: [0, 0, 0, 0],with:800,fontfamily: 'Helvetica'},
    }
  }
    this.pdfString=docDefinition;
    console.log(this.pdfString);
    this.pdfService.open(docDefinition);
  };
//TERMINA PDF
}