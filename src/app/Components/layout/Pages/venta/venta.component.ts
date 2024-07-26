import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { ServicioService } from 'src/app/Services/servicio.service';
import { VentaService } from 'src/app/Services/venta.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

import { Venta } from 'src/app/Interfaces/venta';
import { DetalleVenta } from 'src/app/Interfaces/detalle-venta';
import Swal from 'sweetalert2';
import { Servicio } from 'src/app/Interfaces/servicio';
import { Estado } from 'src/app/Interfaces/estado';
import { EstadoService } from 'src/app/Services/estado.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  listaServicios:Servicio[]=[];
  listaServiciosFiltro:Servicio[]=[];

  listaServiciosParaVenta:DetalleVenta[]=[];
  bloquearBotonRegistrar:boolean=false;

  servicioSeleccionado!:Servicio;
  tipodePagoPorDefecto:string="Efectivo";
  totalPagar:number=0;

  dataEstados:Estado[]=[];
  listaEstados:Estado[]=[];

  formularioServicioVenta:FormGroup;
  columnasTabla:string[]=['servicio','cantidad','stock','precio','total','accion'];
  datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);

  retornarServiciosPorFiltro(busqueda:any):Servicio[]{
    const valorBuscado=typeof busqueda==="string"?busqueda.toLocaleLowerCase():busqueda.nombre.toLocaleLowerCase();
    return this.listaServicios.filter(item=>item.nombre.toLocaleLowerCase().includes(valorBuscado));
  }


  obtenerEstados() {
    this._estadoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataEstados = data.value;
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
  

  constructor(
    private fb:FormBuilder,
    private _servicioServicio:ServicioService,
    private _ventaServicio:VentaService,
    private _utilidadServicio:UtilidadService,
    private _estadoServicio:EstadoService

  ) 
  { 
    this.formularioServicioVenta=this.fb.group({
      servicio:['',Validators.required],
      cantidad:['',Validators.required]
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
    this._estadoServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)
        this.listaEstados=data.value
      },
      error:(e)=>{}
    });


  }

  ngOnInit(): void {
  }
  

  mostrarServicio(producto:Servicio):string{
    return producto.nombre;
  }

  servicioParaVenta(event:any){
    this.servicioSeleccionado=event.option.value;
  }

  agregarServicioParaVenta(){
    const _cantidad:number=this.formularioServicioVenta.value.cantidad;
    const _precio:number=parseFloat(this.servicioSeleccionado.precio);
    const _total:number=_cantidad*_precio;
    this.totalPagar=this.totalPagar+_total;

    this.listaServiciosParaVenta.push({
      idServicio:this.servicioSeleccionado.idServicio,
      descripcionServicio:this.servicioSeleccionado.nombre,
      idEstado:1,
      estadoDescripcion:'',
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
  
  eliminarServicio(detalle:DetalleVenta){
    this.totalPagar=this.totalPagar-parseFloat(detalle.totalTexto),
    this.listaServiciosParaVenta=this.listaServiciosParaVenta.filter(p=>p.idServicio!=detalle.idServicio);
    this.datosDetalleVenta=new MatTableDataSource(this.listaServiciosParaVenta);
  }

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

}
