import { Component, OnInit } from '@angular/core';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { ClienteUsuarioService } from 'src/app/Services/cliente-usuario.service';

import { Usuario } from 'src/app/Interfaces/usuario';
import { ClienteUsuarioAsignado } from 'src/app/Interfaces/cliente-usuario-asignado';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ModalClienteEditComponent } from '../../Modales/modal-cliente-edit/modal-cliente-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ClienteUsuario } from 'src/app/Interfaces/cliente-usuario';
@Component({
  selector: 'app-relacion-cliente-usuario',
  templateUrl: './relacion-cliente-usuario.component.html',
  styleUrls: ['./relacion-cliente-usuario.component.css']
})
export class RelacionClienteUsuarioComponent implements OnInit {
  listadeMisUsuarios:Usuario[]=[];
  nombre:string;
  listaClienteUsuarioNombre:ClienteUsuarioAsignado[]=[];
  idClienteSeleccionado:number;

  constructor(
    private dialog: MatDialog,
    private _usuarioServicio:UsuarioService,
    private  _clienteUsuarioServicio:ClienteUsuarioService,
   private _utilidadServicio:UtilidadService
  ) 
  { 
    this._clienteUsuarioServicio.reporte().subscribe({
      next: (data) => {
        if (data.status) {
          var dataUser=data.value;
          this.listaClienteUsuarioNombre=dataUser;
          console.log(this.listaClienteUsuarioNombre);
        } else{
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
         var numero=this.listaClienteUsuarioNombre.length;
         this.listaClienteUsuarioNombre.shift();
        }
      },
      error: (e) => {}
    });
  }
  traerTodos(){
    this._clienteUsuarioServicio.reporte().subscribe({
      next: (data) => {
        if (data.status) {
          var dataUser=data.value;
          this.listaClienteUsuarioNombre=dataUser;
          console.log(this.listaClienteUsuarioNombre);
        } else{
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
         var numero=this.listaClienteUsuarioNombre.length;
         this.listaClienteUsuarioNombre.shift();
        }
      },
      error: (e) => {}
    });
  }
  ngOnInit(): void {
    this.obtenerUsuario();
    
  }
  trackByItems1(index:number,listadeMisUsuarios:any):number{
    return listadeMisUsuarios.idUsuario;
  }
  obtenerUsuario() {
    this._usuarioServicio.listaNombres().subscribe({
      next: (data) => {
        if (data.status) {
          var dataUsuarios=data.value;
          this.listadeMisUsuarios=dataUsuarios;
          console.log(this.listadeMisUsuarios);
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }

  trackByItems(index:number,dataListaCliente:any):number{
    return dataListaCliente.idCliente;
  }
traerClientes(nombreUsuario:string){
  this.nombre=nombreUsuario;
  console.log(nombreUsuario);
  this.listaClienteUsuarioNombre.shift();
    this._clienteUsuarioServicio.ReporteUsuario(nombreUsuario).subscribe({
      next: (data) => {
        if (data.status) {
          var dataUser=data.value;
          this.listaClienteUsuarioNombre=dataUser;
          console.log(this.listaClienteUsuarioNombre);
        } else{
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
         var numero=this.listaClienteUsuarioNombre.length;
         this.listaClienteUsuarioNombre=[];
        }
      },
      error: (e) => {}
    });
}
capturarCliente(itemDelUsuario){
  //console.log(itemDelUsuario);
  this.idClienteSeleccionado=itemDelUsuario.idCliente;
}
asignarCliente(itemUsuario2:Usuario)
{
//console.log(itemUsuario2);

const Relacion:ClienteUsuario={
  idUsuario:itemUsuario2.idUsuario,
  idCliente:this.idClienteSeleccionado
}

this._clienteUsuarioServicio.guardar(Relacion).subscribe({
  next: (data) => {
    if (data.status) {
      this._utilidadServicio.mostrarAlerta("Cliente Asignado","Exito");
       var dataDevuelta=data.value;
    //  this.listaClienteUsuarioNombre=dataUser;
      console.log(dataDevuelta);
    } else{
      this._utilidadServicio.mostrarAlerta("El cliente ya fue asignado a ese usuario","Oops");
     
    }
  },
  error: (e) => {}
});


}
/*
editarCliente(cliente: Cliente) {
  this.dialog.open(ModalClienteEditComponent, {
    disableClose: true,
    data:cliente
  }).afterClosed().subscribe(resultado => {
    if(resultado === "true")this.obtenerCliente();
  });
}
eliminarCliente(cliente: Cliente) {
  Swal.fire({
    title: '¿Desea elimiar el Cliente',
    text:cliente.nombre,
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Si, Eliminar',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'No, Volver',
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      this._clienteServicio.eliminar(cliente.idCliente).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta(
              'El cliente fue eliminado',
              'Listo!'
            );
            this.obtenerCliente();
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
}*/
}
