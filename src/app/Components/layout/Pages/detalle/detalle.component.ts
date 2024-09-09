import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalServicioComponent } from '../../Modales/modal-servicio/modal-servicio.component';
import { Servicio } from 'src/app/Interfaces/servicio';
import { ServicioService } from 'src/app/Services/servicio.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { DetalleVenta } from 'src/app/Interfaces/detalle-venta';
import { ProspectoDetalleService } from 'src/app/Services/detalle.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  columnasTabla: string[] = ['idServicio','descripcionServicio','idEstado','estadoDescripcion','cantidad','precioTexto','totalTexto','acciones'];
  dataInicio: DetalleVenta[] = [];
  dataListaServicios = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _servicioServicio: ServicioService,
    private _utilidadServicio: UtilidadService,
    private _detalleVenta:ProspectoDetalleService

  ) { }
obtenerServicios() {
    this._detalleVenta.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaServicios.data = data.value;
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
  ngOnInit(): void {
    this.obtenerServicios();
  }

  ngAfterViewInit(): void {
    this.dataListaServicios.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaServicios.filter = filterValue.trim().toLowerCase();
  }

}
