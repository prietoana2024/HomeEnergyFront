import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';

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

import { ProspectoService } from 'src/app/Services/prospecto.service';

import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { Cliente } from 'src/app/Interfaces/cliente';

//TERCERA PRUEBA
import { Router } from '@angular/router';

//
import { Prospecto } from 'src/app/Interfaces/prospecto';
@Component({
  selector: 'app-formulario-select',
  templateUrl: './formulario-select.component.html',
  styleUrls: ['./formulario-select.component.css'],
  providers:[
    {provide:MAT_DATE_FORMATS , useValue:MY_DATA_FORMATS},
  ]
})
export class FormularioSelectComponent implements OnInit {


  formularioCliente:FormGroup;


  miItemEliminar:Usuario;
  _fecha:string;
  //TERCERA PRUEBA

  selectedHero?: Usuario;

  selectedHero1?: Usuario;

  recipeForm!: FormGroup;

  usuariosForm!: FormGroup;



/*  ADICIONADOS PARA EL USUARIO*/

 usuariosAgregados=new FormControl('');

 listaVacio:Usuario[]=[];

 lista:Usuario[]=[];

  listaUsuarios:Usuario[]=[];
  listaUsuariosFiltro:Usuario[]=[];

  listaUsuariosAgregados:Usuario[]=[];

  usuarioSeleccionado!:Usuario;

  listaUsuariosParaVenta:Usuario[]=[];
  /*ADICIONADOS PARA EL DISABLED*/ 

  disableSelect = new FormControl(false);

  //ADICIONADO PARA EL COMPONENTE DE PRUEBA
  listaProspectosParaUsuariosData:Prospecto[]=[];
  listaProspectosParaUsuarios:Prospecto[]=[];
  tarjetasParaUsuarios:Prospecto[]=this.listaProspectosParaUsuarios;
  movieToFindParaUsuarios:string='';
  movieListObjectParaUsuarios:Prospecto[]=this.listaProspectosParaUsuarios;
  seleccion:string='';
  idEliminar:number;

  Auditor:number;

 // formularioCliente:FormGroup;

  dataProspectosParaUsuarios: Prospecto[] = [];
  prospectoSeleccionadoParaUsuarios!:Prospecto;
  dataInicioParaUsuarios: Prospecto[] = [];



  constructor(
    private fb: FormBuilder,
    /*ADCIONADOS PARA USUARIOS*/
    private _prospectoServicio: ProspectoService,
    private _utilidadServicio: UtilidadService,
    private _clienteServicio:ClienteService,
    private _usuarioServicio:UsuarioService,
    private router: Router

  ) 
  {
    // con usuarios
    this.usuariosForm = this.fb.group({
      fecha: new FormControl("", [Validators.required]),
      user: this.fb.array([
        this.fb.group({
          idUsuario: [, Validators.required],
          nombreCompleto: ['', Validators.required],
          correo: ['', Validators.required],
          idRol: [, Validators.required],
          rolDescripcion: ['', Validators.required],
          clave: ['', Validators.required],
          esActivo: [, Validators.required]
        }),
      ]),
    });

    this._prospectoServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)
         this.listaProspectosParaUsuariosData=data.value;
          //const lista=data.value as Prospecto[];
         // this.listaServicios=lista.filter(p=>p.esActivo==1);
          this.listaProspectosParaUsuariosData=this.listaProspectosParaUsuariosData.filter(p=>p.esActivo==1);
      
      },
      error:(e)=>{}
    });


    //obtener usuarios

    this._usuarioServicio.lista().subscribe({
      next:(data)=>{
        if(data.status){
          this.lista=data.value as Usuario[];
          this.listaUsuarios=this.lista;
        }
      },
      error:(e)=>{}
    })
   }

  ngOnInit(): void {
/*
    const items = this.usuariosForm.get('user') as FormArray;
    console.log(items.value);
    if(this.selectedHero==null  ||  this.miItemEliminar==null){
      items.removeAt(0);
      console.log(items.value);
    }

*/
   const items = this.usuariosForm.get('user') as FormArray;
    window.onload = function() { // también puede usar window.addEventListener('load', (event) => {
     // alert('Página cargada');
     items.removeAt(0);
      console.log(items.value);
    };

    //ParaUsuarios

  }
  registrarFecha(){
    this._fecha=moment(this.usuariosForm.value.fecha).format("DD/MM/YYYY");
    
    if(this._fecha==="Invalid date")
    {
       this._utilidadServicio.mostrarAlerta("Debe ingresar fecha de firma de contrato","Oops!")
       return;
    }



  }

  onSelect(hero: Usuario): void {

    //1-recibe el item seleccionado y trae un tipo usuario

    this.selectedHero = hero;

   //2-Obtiene el modelo que contiene la data a enviar

    const items = this.usuariosForm.get('user') as FormArray;

   //3-crea un modelo que obtiene la data actual de el form array 

    const itemsNew=items;

    if (hero!=null) {
      itemsNew.push(
        this.fb.group({
          idUsuario:hero.idRol,
          nombreCompleto:hero.nombreCompleto,
          correo:hero.correo,
          idRol:hero.idRol,
          rolDescripcion:hero.rolDescripcion,
          clave:hero.clave,
          esActivo:hero.esActivo
        })
      );
    }

    console.log(items.value);
    console.log(itemsNew.value);

    const list = this.listaUsuarios.filter(function(element) { return element!=hero}); // filtramos

    this.listaUsuarios=list;
    console.log( list );

    const agregadoNuevo=this.lista.find(function(element) { return element==hero});

    this.listaUsuariosAgregados.push(agregadoNuevo);

    this.usuariosForm.patchValue({
      fecha:this.usuariosForm.value.fecha,
      user:itemsNew
     })
  }

  deleteSelect(){

    this.listaUsuarios=this.lista;


    // Expected output: 4


    this.listaUsuariosAgregados=this.listaVacio;


    console.log(this.listaUsuarios);
    console.log(this.listaUsuariosAgregados);
  }

  removeUser(item:Usuario): void{



    console.log(this.listaUsuariosAgregados);
    const list = this.lista.find(function(element) { return element=item}); // filtramos

 

    this.listaUsuarios.push(item);

    const listaNuevosAgregados=this.listaUsuariosAgregados.filter((element) => element !== item); // filtramos

    this.listaUsuariosAgregados=listaNuevosAgregados;


    const items = this.usuariosForm.get('user') as FormArray;
   

    const index =items.value.findIndex(obj => obj.index === list.idUsuario)

    const itemsNuevos=items.removeAt(index);

      this.usuariosForm.patchValue({
        fecha:this.usuariosForm.value.fecha,
        user:itemsNuevos
       })

      console.log(this.listaUsuariosAgregados)
  }

  //FUNCIONES DEL MODAL

  

  prospectoParaVenta(event:any){
    this.prospectoSeleccionadoParaUsuarios=event.option.value;
    console.log(this.prospectoSeleccionadoParaUsuarios.idProspecto);
  }
  
  
  findMovie(){
    this.movieListObjectParaUsuarios=this.listaProspectosParaUsuarios.filter(m=>m.nombre.toLowerCase().includes(this.movieToFindParaUsuarios.toLowerCase()));
     console.log(this.movieListObjectParaUsuarios);
     this.tarjetasParaUsuarios=this.movieListObjectParaUsuarios;
  }
  resetListMovie(){
    
    this.movieListObjectParaUsuarios=this.listaProspectosParaUsuarios;
    this.movieToFindParaUsuarios="";
    this.tarjetasParaUsuarios=this.movieListObjectParaUsuarios;
  }
  trackByItems(index:number,listaProspectosParaUsuarios:any):number{
    return listaProspectosParaUsuarios.idProspecto;
  }
  aplicarFiltro(movieToFindParaUsuarios: Event) {
    this.movieListObjectParaUsuarios=this.listaProspectosParaUsuarios.filter(m=>m.nombre.toLowerCase().includes(this.movieToFindParaUsuarios.toLowerCase()));
    console.log(this.movieListObjectParaUsuarios);
    this.tarjetasParaUsuarios=this.movieListObjectParaUsuarios;
  }
  seleccionado(movieToFindParaUsuarios: Event) {

    this.movieListObjectParaUsuarios=this.listaProspectosParaUsuarios.filter(m=>m.nombre.toLowerCase().includes(this.movieToFindParaUsuarios.toLowerCase()));
    this.tarjetasParaUsuarios=this.movieListObjectParaUsuarios;
  }

  convertirCrear(item:Prospecto){

    this._fecha=moment(this.usuariosForm.value.fecha).format("DD/MM/YYYY");
    
    if(this._fecha==="Invalid date")
    {
       this._utilidadServicio.mostrarAlerta("Debe ingresar fecha de firma de contrato","Oops!")
       return;
    }

    const _cliente:Cliente={
      idCliente:5,
      nombre:item.nombre,
      fachadaimg:item.fachadaimg,
      url:item.url,
      direccion:item.direccion,
      contacto:item.contacto,
      razonSocial:item.razonSocial,
      idauditor:item.idauditor,
      detalle:item.detalle,
      esActivo:item.esActivo,
      fecha:this._fecha,
      idProspecto: item.idProspecto,
      fechaRegistro:this._fecha
    }

    const request=_cliente;
     this._clienteServicio.guardar(request).subscribe({
      next:(data)=>{
        if(data.status){
          console.log("entre en enviar objeto")
          this._utilidadServicio.mostrarAlerta("El cliente fue registrado","Exito");
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo registrar el cliente","Error")
      },
      error:(e)=>{}
     })
  }
  /**EMPIEZAN LOS COMPONENTES DE MI SELECCION */

}

