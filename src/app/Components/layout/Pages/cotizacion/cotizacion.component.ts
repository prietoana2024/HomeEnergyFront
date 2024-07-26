import {MatTabsModule} from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ProspectoService } from 'src/app/Services/prospecto.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { FormBuilder,FormGroup,Validators,FormsModule } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalPruebaComponent } from '../../Modales/modal-prueba/modal-prueba.component';

import { ModalCotizacionComponent } from '../../Modales/modal-cotizacion/modal-cotizacion.component';

import Swal from 'sweetalert2';

import { Estado } from 'src/app/Interfaces/estado';
import { EstadoService } from 'src/app/Services/estado.service';

import { Servicio } from 'src/app/Interfaces/servicio';
import { ServicioService } from 'src/app/Services/servicio.service';

import { DetalleVenta } from 'src/app/Interfaces/detalle-venta';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit, AfterViewInit{

  listaEstados:Estado[]=[];
  dataEstados: Estado[] = [];
  estadoSeleccionado!:Estado;

  listaServicios:Servicio[]=[];
  listaServiciosFiltro:Servicio[]=[];

  listaServiciosParaVenta:DetalleVenta[]=[];
  listaEstadosParaVenta:DetalleVenta[]=[];
  bloquearBotonRegistrar:boolean=false;

  servicioSeleccionado!:Servicio;
  tipodePagoPorDefecto:string="Efectivo";

  selectedValue: string;
  selectedCar: string;
  listaProspectos:Prospecto[]=[];
  tarjetas:Prospecto[]=this.listaProspectos;
  movieToFind:string='';
  movieListObject:Prospecto[]=this.listaProspectos;
  seleccion:string='';
  idEliminar:number;

  Auditor:number;

  foods:Prospecto[]=[];

  cars: Prospecto[]=[];

  formularioProspecto:FormGroup;

  
  listaProspectosParaVenta:Prospecto[]=[];
  dataProspectos: Prospecto[] = [];
  prospectoSeleccionado!:Prospecto;
  columnasTabla: string[] = ['nombre','fachadaimg','url','direccion','contacto','razonSocial','idauditor','detalle','estado','acciones'];
  dataInicio: Prospecto[] = [];
  
  dataListaProspecto = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  constructor(

    private dialog: MatDialog,
    private _prospectoServicio: ProspectoService,
    private _utilidadServicio: UtilidadService,
    private fb:FormBuilder
  ) {

    

    this._prospectoServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)
        this.listaProspectos=data.value;
      
      },
      error:(e)=>{}
    });

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

    

   }

   obtenerProspecto() {
    this._prospectoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaProspecto.data = data.value;
          console.log(this.dataListaProspecto);
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
   
   mostrarProspecto(prospecto:Prospecto):string{
    return prospecto.nombre;
  
  }
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.dataListaProspecto.paginator = this.paginacionTabla;

  }
  prospectoParaVenta(event:any){
    this.prospectoSeleccionado=event.option.value;
    console.log(this.prospectoSeleccionado.idProspecto);
  }
  
  
  agregarProspectoParaVenta(){

    if(this.prospectoSeleccionado!=null){
      this.formularioProspecto.patchValue({
        idProspecto:this.prospectoSeleccionado.idProspecto,
        nombre:this.prospectoSeleccionado.nombre,
        fachadaimg:this.prospectoSeleccionado.fachadaimg,
        url:this.prospectoSeleccionado.url,
        direccion:this.prospectoSeleccionado.direccion,
        contacto: this.prospectoSeleccionado.contacto,
        razonSocial:this.prospectoSeleccionado.razonSocial,
        idauditor:this.prospectoSeleccionado.idauditor,
        detalle:this.prospectoSeleccionado.detalle,
        esActivo:this.prospectoSeleccionado.esActivo.toString()

      })
    }
  }
  findMovie(){
    this.movieListObject=this.listaProspectos.filter(m=>m.nombre.toLowerCase().includes(this.movieToFind.toLowerCase()));
     console.log(this.movieListObject);
     this.tarjetas=this.movieListObject;
  }
  resetListMovie(){
    
    this.movieListObject=this.listaProspectos;
    this.movieToFind="";
    this.tarjetas=this.movieListObject;
  }
  trackByItems(index:number,listaProspectos:any):number{
    return listaProspectos.idProspecto;
  }
  aplicarFiltro(movieToFind: Event) {
    this.movieListObject=this.listaProspectos.filter(m=>m.nombre.toLowerCase().includes(this.movieToFind.toLowerCase()));
    console.log(this.movieListObject);
    this.tarjetas=this.movieListObject;
  }
  seleccionado(movieToFind: Event) {

    this.movieListObject=this.listaProspectos.filter(m=>m.nombre.toLowerCase().includes(this.movieToFind.toLowerCase()));
    this.tarjetas=this.movieListObject;
  }
  mostrarOpciones(){}

  duplicarProspecto(prospecto: Prospecto) {
    this.dialog.open(ModalPruebaComponent, {
        disableClose: true,
        data: prospecto,
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

  delete(hero: Prospecto): void {
    this.listaProspectos = this.movieListObject.filter(h => h !== hero);
    Swal.fire({
      title: '¿Desea elimiar el Prospecto',
      text:hero.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, Volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._prospectoServicio.eliminar(hero.idProspecto).subscribe({
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

  administrar(prospecto: Prospecto){
    this.movieListObject = this.listaProspectos.filter(h => h !== prospecto);
    this.idEliminar=prospecto.idProspecto;
    const id=this.idEliminar;
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
  activarBotones(){
    document.getElementById('extra').innerHTML = `<button  style="background: #a6e4ff;
    border-radius: 8%;
    color: #000000;
    font-family: 'Roboto';
    font-weight: lighter;
    border: transparent;">Nueva Cotizacion</button>`

  }
  nuevaCotizacion() {
    this.dialog.open(ModalCotizacionComponent, {
        disableClose: true,
        data:this.movieListObject,
      }).afterClosed().subscribe(resultado => {
        if(resultado === "true")this.obtenerProspecto();
      });
  }
  openDetails(item:Prospecto){
    this.dialog.open(ModalCotizacionComponent, {
      disableClose: true,
      data:this.movieListObject,
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")this.obtenerProspecto();
    });
    

    this.Auditor=item.idauditor;
    console.log(this.Auditor.toString());

    document.getElementById('nombre').setAttribute('value',item.nombre);
    
    document.getElementById('fachadaimg').setAttribute('value',item.fachadaimg);

    document.getElementById('direccion').setAttribute('value',item.direccion);

    document.getElementById('contacto').setAttribute('value',item.contacto);

    document.getElementById('razonSocial').setAttribute('value',item.razonSocial);
   
    document.getElementById('detalle').setAttribute('value',item.detalle);

    document.getElementById('idauditor').setAttribute('value',this.Auditor.toString());

  }
  openDetails1(item:Prospecto){
    this.dialog.open(ModalCotizacionComponent, {
      disableClose: true,
      data:this.listaProspectos,
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")this.obtenerProspecto();
    });
    

    this.Auditor=item.idauditor;
    console.log(this.Auditor.toString());

    document.getElementById('nombre').setAttribute('value',item.nombre);
    
    document.getElementById('fachadaimg').setAttribute('value',item.fachadaimg);

    document.getElementById('direccion').setAttribute('value',item.direccion);

    document.getElementById('contacto').setAttribute('value',item.contacto);

    document.getElementById('razonSocial').setAttribute('value',item.razonSocial);
   
    document.getElementById('detalle').setAttribute('value',item.detalle);

    document.getElementById('idauditor').setAttribute('value',this.Auditor.toString());

  }
}

