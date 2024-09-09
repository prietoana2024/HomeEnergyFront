import { Component, OnInit,AfterViewInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ProspectoService } from 'src/app/Services/prospecto.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ModalProspectoComponent } from '../../Modales/modal-prospecto/modal-prospecto.component';


import { ServicioService } from 'src/app/Services/servicio.service';
import { VentaService } from 'src/app/Services/venta.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

import { Venta } from 'src/app/Interfaces/venta';
import { DetalleVenta } from 'src/app/Interfaces/detalle-venta';
import Swal from 'sweetalert2';
import { Servicio } from 'src/app/Interfaces/servicio';
import { Cliente } from 'src/app/Interfaces/cliente';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-mis-cotizaciones',
  templateUrl: './mis-cotizaciones.component.html',
  styleUrls: ['./mis-cotizaciones.component.css']
})
export class MisCotizacionesComponent implements OnInit,AfterViewInit {

  listaServicios:Servicio[]=[];
  listaServiciosFiltro:Servicio[]=[];

  listaProspectos:Prospecto[]=[];
  listaProspectosFiltro:Prospecto[]=[];

  dataListaProspecto = new MatTableDataSource(this.listaProspectos);
  
  listaServiciosParaVenta:DetalleVenta[]=[];
  bloquearBotonRegistrar:boolean=false;

  listaProspectosParaVenta:Cliente[]=[];


  servicioSeleccionado!:Servicio;
  tipodePagoPorDefecto:string="Efectivo";
  totalPagar:number=0;

  prospectoSeleccionado!:Prospecto;

  formularioServicioVenta:FormGroup;
  columnasTabla:string[]=['servicio','cantidad','stock','precio','total','accion'];
  datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);

  formularioProspectoVenta:FormGroup;
  columnasTabla2:string[]=['prospecto','fachadaimg','url','direccion','contacto','razonSocial','idauditor','detalle','fecha','estado','accion'];
  datosCliente=new MatTableDataSource(this.listaProspectosParaVenta);

  retornarServiciosPorFiltro(busqueda:any):Servicio[]{
    const valorBuscado=typeof busqueda==="string"?busqueda.toLocaleLowerCase():busqueda.nombre.toLocaleLowerCase();
    return this.listaServicios.filter(item=>item.nombre.toLocaleLowerCase().includes(valorBuscado));
  }
  /*retornarProspectosPorFiltro(busqueda:any):Prospecto[]{
    const valorBuscado=typeof busqueda==="string"?busqueda.toLocaleLowerCase():busqueda.nombre.toLocaleLowerCase();
    return this.listaProspectos.filter(item=>item.nombre.toLocaleLowerCase().includes(valorBuscado));
  }
*/
  constructor(
    private fb:FormBuilder,
    private dialog: MatDialog,
    private _servicioServicio:ServicioService,
    private _prospectoServicio:ProspectoService,
    private _clienteServicio:ClienteService,
    private _ventaServicio:VentaService,
    private _utilidadServicio:UtilidadService
  ) 
  {
    this.formularioServicioVenta=this.fb.group({
      servicio:['',Validators.required],
      cantidad:['',Validators.required]
    });

    this.formularioProspectoVenta=this.fb.group({
      prospecto:['',Validators.required]
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

      this.formularioServicioVenta.get('servicio')?.valueChanges.subscribe(value=>{
      this.listaServiciosFiltro=this.retornarServiciosPorFiltro(value);
    })

    this._prospectoServicio.lista().subscribe({
      next:(data)=>{
        if(data.status){
          const lista=data.value as Prospecto[];
          this.listaProspectos=lista.filter(p=>p.esActivo==1);
        }
      },
      error:(e)=>{}
    })

   }

   ngOnInit(): void {
  }

  mostrarServicio(servicio:Servicio):string{
    return servicio.nombre;
  }

  mostrarProspecto(prospecto:Prospecto):string{
    return prospecto.nombre;
  }

  servicioParaVenta(event:any){
    this.servicioSeleccionado=event.option.value;
    console.log(this.servicioSeleccionado)
  }

  prospectoParaVenta(event:any){
    this.prospectoSeleccionado=event.option.value;
    console.log(this.prospectoSeleccionado);
  }

  agregarServicioParaVenta(){
    const _cantidad:number=this.formularioServicioVenta.value.cantidad;
    const _precio:number=parseFloat(this.servicioSeleccionado.precio);
    const _total:number=_cantidad*_precio;
    this.totalPagar=this.totalPagar+_total;

    this.listaServiciosParaVenta.push({
      idServicio:this.servicioSeleccionado.idServicio,
      descripcionServicio:this.servicioSeleccionado.nombre,
      idEstado:this.servicioSeleccionado.idCategoria,
      estadoDescripcion:this.servicioSeleccionado.nombre,
      cantidad:_cantidad,
      precioTexto:String(_precio.toFixed(2)),
      totalTexto:String(_total.toFixed(2))
    })

    this.datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);

    this.formularioServicioVenta.patchValue({
      servicio:'',
      cantidad:''

    })

  }

  agregarProspectoParaVenta(){

    this.listaProspectosParaVenta.push({
      idProspecto:this.prospectoSeleccionado.idProspecto,
      idCliente:this.prospectoSeleccionado.idProspecto,
      nombre:this.prospectoSeleccionado.nombre,
      fachadaimg:this.prospectoSeleccionado.fachadaimg,
      url:this.prospectoSeleccionado.url,
      direccion:this.prospectoSeleccionado.direccion,
      contacto: this.prospectoSeleccionado.contacto,
      razonSocial:this.prospectoSeleccionado.razonSocial,
      idauditor:this.prospectoSeleccionado.idauditor,
      detalle:this.prospectoSeleccionado.detalle,
      esActivo:this.prospectoSeleccionado.esActivo,
      fecha:''

    })

    this.datosCliente=new MatTableDataSource(this.listaProspectosParaVenta);

    this.formularioProspectoVenta.patchValue({
      prospecto:''
    })

  }
  
  eliminarServicio(detalle:DetalleVenta){
    this.totalPagar=this.totalPagar-parseFloat(detalle.totalTexto),
    this.listaServiciosParaVenta=this.listaServiciosParaVenta.filter(p=>p.idServicio!=detalle.idServicio);
    this.datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);
  }

  /*eliminarProspecto(cliente:Cliente){
    this.listaProspectosParaVenta=this.listaProspectosParaVenta.filter(p=>p.idProspecto!=cliente.idProspecto);
    this.datosCliente=new MatTableDataSource(this.listaProspectosParaVenta);
  }*/


  registrarVenta(){
    if(this.listaServiciosParaVenta.length>0){
      this.bloquearBotonRegistrar=true;

      const request:Venta={

    
        tipoPago:this.tipodePagoPorDefecto,
        totalTexto:String(this.totalPagar.toFixed(2)),
        detalleVenta:this.listaServiciosParaVenta
        
        

      }
      this._ventaServicio.registrar(request).subscribe({
        next:(response)=>{
          if(response.status){
            this.totalPagar=0.00;
            this.listaServiciosParaVenta=[];
            this.datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);

            Swal.fire({
              icon:'success',
              title:'Venta Registrada!',
              text:`Numero de Venta: ${response.value.numeroDocumento}`
            })
          }else
          this._utilidadServicio.mostrarAlerta("No se pudo registar la venta","Oops");
        },
      complete:()=>{
        this.bloquearBotonRegistrar=false;
      },
      error:(e)=>{}
      })
    }
  }

  nuevoProspecto() {
    this.dialog.open(ModalProspectoComponent, {
        disableClose: true,
      }).afterClosed().subscribe(resultado => {
        if(resultado === "true")this.obtenerProspecto();
      });
  }
  ngAfterViewInit(): void {
  }
  obtenerProspecto() {
    this._prospectoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaProspecto.data = data.value;
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
  editarProspecto(prospecto: Prospecto) {
    this.dialog.open(ModalProspectoComponent, {
      disableClose: true,
      data:prospecto
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")this.obtenerProspecto();
    });
  }
  eliminarProspecto(prospecto: Prospecto) {
    Swal.fire({
      title: '¿Desea elimiar el Prospecto',
      text:prospecto.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, Volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._prospectoServicio.eliminar(prospecto.idProspecto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta(
                'El Prospecto fue eliminado',
                'Listo!'
              );
              this.obtenerProspecto();
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
    });
  }
  

}
