import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CotizacionService } from 'src/app/Services/cotizacion.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { Cotizacion } from 'src/app/Interfaces/cotizacion';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalPruebaComponent } from '../../Modales/modal-prueba/modal-prueba.component';
import { ModalSimulacionPdfComponent } from '../../Modales/modal-simulacion-pdf/modal-simulacion-pdf.component';

@Component({
  selector: 'app-cotizacion-complete',
  templateUrl: './cotizacion-complete.component.html',
  styleUrls: ['./cotizacion-complete.component.css']
})
export class CotizacionCompleteComponent implements OnInit, AfterViewInit  {


  columnasTabla: string[] = ['idProspecto','pulgadas2','tipoPago','totalTexto','notas','servicios','acciones'];
  dataInicio: Cotizacion[] = [];
  dataListaCotizacion = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _cotizacionServicio: CotizacionService,
    private _utilidadServicio: UtilidadService
  ) { }

  obtenerCotizacion() {
    this._cotizacionServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaCotizacion.data = data.value;
          console.log(this.dataListaCotizacion);
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
  ngOnInit(): void {
    this.obtenerCotizacion();
  }
  ngAfterViewInit(): void {
    this.dataListaCotizacion.paginator = this.paginacionTabla;
  }
  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaCotizacion.filter = filterValue.trim().toLowerCase();
  }
  nuevoCotizacion() {
    this.dialog.open(ModalSimulacionPdfComponent, {
        disableClose: true,
      }).afterClosed().subscribe(resultado => {
        if(resultado === "true")this.obtenerCotizacion();
      });
  }

  editarCotizacion(cotizacion: Cotizacion) {
    this.dialog.open(ModalSimulacionPdfComponent, {
      disableClose: true,
      data:cotizacion
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")this.obtenerCotizacion();
    });
  }
  eliminarCotizacion(cotizacion: Cotizacion) {
    Swal.fire({
      title: '¿Desea elimiar el Prospecto',
      text:cotizacion.notas,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, Volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._cotizacionServicio.eliminar(cotizacion.idProspecto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta(
                'El Prospecto fue eliminado',
                'Listo!'
              );
              this.obtenerCotizacion();
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
