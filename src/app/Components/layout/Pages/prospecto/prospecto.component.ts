import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProspectoComponent } from '../../Modales/modal-prospecto/modal-prospecto.component';
import { ModalPruebaComponent } from '../../Modales/modal-prueba/modal-prueba.component';

import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ProspectoService } from 'src/app/Services/prospecto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-prospecto',
  templateUrl: './prospecto.component.html',
  styleUrls: ['./prospecto.component.css']
})
export class ProspectoComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre','fachadaimg','url','direccion','contacto','razonSocial','idauditor','detalle','estado','acciones'];
  dataInicio: Prospecto[] = [];
  dataListaProspecto = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _prospectoServicio: ProspectoService,
    private _utilidadServicio: UtilidadService) { }

    obtenerProspecto() {
      this._prospectoServicio.lista().subscribe({
        next: (data) => {
          if (data.status) {
            this.dataInicio = data.value;
            this.dataListaProspecto.data = data.value;
            console.log(this.dataListaProspecto);
          } else
            this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
        },
        error: (e) => {}
      });
    }

  ngOnInit(): void {
    this.obtenerProspecto();
  }
  ngAfterViewInit(): void {
    this.dataListaProspecto.paginator = this.paginacionTabla;
  }
  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProspecto.filter = filterValue.trim().toLowerCase();
  }
  nuevoProspecto() {
    this.dialog.open(ModalPruebaComponent, {
        disableClose: true,
      }).afterClosed().subscribe(resultado => {
        if(resultado === "true")this.obtenerProspecto();
      });
  }
  editarProspecto(prospecto: Prospecto) {
    this.dialog.open(ModalPruebaComponent, {
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
