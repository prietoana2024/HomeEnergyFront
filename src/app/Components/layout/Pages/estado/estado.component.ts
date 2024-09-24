import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalEstadoComponent } from '../../Modales/modal-estado/modal-estado.component';
import { Estado } from 'src/app/Interfaces/estado';
import { EstadoService } from 'src/app/Services/estado.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre','acciones'];
  dataInicio: Estado[] = [];
  dataListaEstado = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _estadoServicio: EstadoService,
    private _utilidadServicio: UtilidadService
  ) 
  { }

  obtenerEstados() {
    this._estadoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaEstado.data = data.value;
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }

  ngOnInit(): void {
    this.obtenerEstados();
  }
  ngAfterViewInit(): void {
    this.dataListaEstado.paginator = this.paginacionTabla;
  }
  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaEstado.filter = filterValue.trim().toLowerCase();
  }
  nuevoEstado() {
    this.dialog.open(ModalEstadoComponent, {
        disableClose: true
      }).afterClosed().subscribe(resultado => {
        if(resultado === "true")this.obtenerEstados();
      });
  }

  editarEstado(estado: Estado) {
    this.dialog.open(ModalEstadoComponent, {
      disableClose: true,
      data:estado
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")this.obtenerEstados();
    });
  }
  eliminarEstado(estado: Estado) {
    Swal.fire({
      title: '¿Desea elimiar el estado',
      text:estado.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, Volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._estadoServicio.eliminar(estado.idEstado).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta(
                'El estado fue eliminado',
                'Listo!'
              );
              this.obtenerEstados();
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
