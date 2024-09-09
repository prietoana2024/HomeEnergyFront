
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
import { ClienteService } from 'src/app/Services/cliente.service';
import { Cliente } from 'src/app/Interfaces/cliente';

import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
/*PARA EL ACORDEON */

import { FormArray} from '@angular/forms';


//TERCERA PRUEBA
import { Router } from '@angular/router';

/*LO AGREGADO RECIEN */
export const MY_DATA_FORMATS={
  parse:{
    dateInput:'DD/MM/YYYY'
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
  }
}

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import * as XLSX from "xlsx";

import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css'],
  providers:[
    {provide:MAT_DATE_FORMATS , useValue:MY_DATA_FORMATS},
  ]
})
export class ModalClienteComponent implements OnInit, AfterViewInit {

/*  ADICIONADOS PARA EL USUARIO*/

  /*ADICIONADOS PARA EL DISABLED*/ 

/**AGREGADOS AL FINAL ARRIBA */


  obj:any;

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  toppings = new FormControl('');

  //usuariosAgregados=new FormControl('');

  form: FormGroup;

  arreglo:any;

  formularioFecha:FormGroup;
  /*TERMINAN VARIABLES DE ACORDEON*/
  listaProspectos:Prospecto[]=[];
  tarjetas:Prospecto[]=this.listaProspectos;
  movieToFind:string='';
  movieListObject:Prospecto[]=this.listaProspectos;
  seleccion:string='';
  idEliminar:number;

  Auditor:number;

  foods:Prospecto[]=[];

  cars: Prospecto[]=[];

  formularioCliente:FormGroup;

  
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
    private _clienteServicio:ClienteService,
    private _usuarioServicio:UsuarioService,
    private fb:FormBuilder
  ) 
  {
    /**AQUI EMPIEZA EL COMPONENTE PARA LA SELECCION DE USUARIOS */

    /**AQUI TERMINA EL COMPONENTE PARA LA SELECCION DE USUARIOS */
    this._prospectoServicio.lista().subscribe({
      next:(data)=>{
        if(data.status){
          const lista=data.value as Prospecto[];
         // this.listaServicios=lista.filter(p=>p.esActivo==1);
          this.listaProspectos=lista.filter(p=>p.esActivo==1);
       // this.listaProspectos=data.value;
        }
      
      },
      error:(e)=>{}
    });

    this._usuarioServicio.lista().subscribe({
      next:(data)=>{
        if(data.status){
          const lista=data.value as Usuario[];
        }
      },
      error:(e)=>{}
    })


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

  /*  this.form = this.fb.group({
      idUsuario:[,Validators.required],
      nombreCompleto:['',Validators.required],
      correo:['',Validators.required],
      idRol:[,Validators.required],
      rolDescripcion:['',Validators.required],
      clave:['',Validators.required],
      esActivo:[,Validators.required]
    })*/
  
  }
  
  ngAfterViewInit(): void {
    this.dataListaProspecto.paginator = this.paginacionTabla;

  }
  prospectoParaVenta(event:any){
    this.prospectoSeleccionado=event.option.value;
    console.log(this.prospectoSeleccionado.idProspecto);
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
  convertirCrear(item:Prospecto){

    console.log("Entre a la funcion");
  

    const _cliente:Cliente={
      
      nombre:this.formularioCliente.value.nombre,
      fachadaimg:this.formularioCliente.value.fachadaimg,
      url:this.formularioCliente.value.url,
      direccion:this.formularioCliente.value.direccion,
      contacto:this.formularioCliente.value.contacto,
      razonSocial:this.formularioCliente.value.razonSocial,
      idauditor:this.formularioCliente.value.idauditor,
      detalle:this.formularioCliente.value.detalle,
      esActivo:this.formularioCliente.value.esActivo,
      idProspecto:this.formularioCliente.value.idProspecto
    }


    console.log(_cliente);

    /*this._clienteServicio.registrar(_cliente).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El usuario fue registrado","Exito");
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el usuario","Error")
      },
      error:(e)=>{}
     })*/
  }
  /**EMPIEZAN LOS COMPONENTES DE MI SELECCION */

  convertirCrearCliente(item:Prospecto){

    const _cliente:Cliente={
      nombre:item.nombre,
      fachadaimg:item.fachadaimg,
      url:item.url,
      direccion:item.direccion,
      contacto:item.contacto,
      razonSocial:item.razonSocial,
      idauditor:item.idauditor,
      detalle:item.detalle,
      esActivo:item.esActivo,
      idProspecto: item.idProspecto
    }
    const request=_cliente;
     this._clienteServicio.guardar(request).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El cliente fue registrado","Exito");
          this.obtenerProspecto();
        }else{
        var status=data.value;
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el cliente","Error")
        }
      },
      error:(e)=>{}
     })
  }
  /**EMPIEZAN LOS COMPONENTES DE MI SELECCION */
}