import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProspectoComponent } from '../../Modales/modal-prospecto/modal-prospecto.component';
import { ModalPruebaComponent } from '../../Modales/modal-prueba/modal-prueba.component';

import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';

import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ProspectoService } from 'src/app/Services/prospecto.service';

import { Cliente } from 'src/app/Interfaces/cliente'
import { ModalClienteComponent } from '../../Modales/modal-cliente/modal-cliente.component';
import { ModalClienteEditComponent } from '../../Modales/modal-cliente-edit/modal-cliente-edit.component';

import { ClienteUsuarioAsignado } from 'src/app/Interfaces/cliente-usuario-asignado';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ClienteUsuarioService } from 'src/app/Services/cliente-usuario.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Usuario } from 'src/app/Interfaces/usuario';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

import { UsuarioService } from 'src/app/Services/usuario.service';
@Component({
  selector: 'app-cliente-v',
  templateUrl: './cliente-v.component.html',
  styleUrls: ['./cliente-v.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClienteVComponent implements OnInit {

  readonly bestBoys: string[] = ['Samoyed', 'Akita Inu', 'Alaskan Malamute', 'Siberian Husky'];
  nombre:string;
  usuarioControl = new FormControl('');
  usuario?: string;
  //readonly panelOpenState = signal(false);
  columnasTabla: string[] = ['nombre','fachadaimg','url','direccion','contacto','razonSocial','idauditor','detalle','estado','acciones'];
  dataInicio: Prospecto[] = [];
  dataListaProspecto = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
    listaClientes:Cliente[]=[];
  columnasTablaCliente: string[] = ['nombre','fachadaimg','url','direccion','contacto','razonSocial','idauditor','detalle','estado','idProspecto','acciones'];
  dataInicioCliente: Cliente[] = [];
  dataListaCliente = new MatTableDataSource(this.dataInicio);

  listaClienteUsuario:Cliente[]=[];
  listaUsuarios:Usuario[]=[];

  constructor(
    private dialog: MatDialog,
    private _clienteServicio:ClienteService,
    private _prospectoServicio: ProspectoService,
    private _utilidadServicio: UtilidadService,
    private _clienteUsuarioServicio:ClienteUsuarioService,
    private _usuarioServicio:UsuarioService
  ) { }
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
obtenerCliente() {
    this._clienteServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaCliente.data = data.value;
          console.log(this.dataListaCliente);
          this.listaClientes=data.value;

        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
//Modulo de vista de usuarios de clientes
  obtenerUsuarioCliente() {
    this._clienteUsuarioServicio.reporte().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaUsuarios=data.value;

        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
//Termina Modulo de vista de usuarios de clientes

//Modulo de vista de usuarios 


//Termina Modulo de vista de usuarios
  trackByItems(index:number,dataListaCliente:any):number{
    return dataListaCliente.idCliente;
  }
ngOnInit(): void {
  this.obtenerProspecto();
  this.obtenerCliente();
  this.obtenerUsuarioCliente();

}
ngAfterViewInit(): void {
  this.dataListaCliente.paginator = this.paginacionTabla;
}
aplicarFiltroTabla(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataListaCliente.filter = filterValue.trim().toLowerCase();
}
nuevoCliente() {
  this.dialog.open(ModalClienteComponent, {
      disableClose: true,
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")this.obtenerProspecto();
    });
}
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
}

}
