import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalServicioComponent } from '../../Modales/modal-servicio/modal-servicio.component';
import { Servicio } from 'src/app/Interfaces/servicio';
import { ServicioService } from 'src/app/Services/servicio.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-v',
  templateUrl: './servicio-v.component.html',
  styleUrls: ['./servicio-v.component.css']
})
export class ServicioVComponent implements OnInit {

  columnasTabla: string[] = ['nombre','categoria','precio','estado'];
  dataInicio: Servicio[] = [];
  dataListaServicios = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;


  constructor(
    private dialog: MatDialog,
    private _servicioServicio: ServicioService,
    private _utilidadServicio: UtilidadService
  ) { }

  obtenerServicios() {
    this._servicioServicio.lista().subscribe({
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

  nuevoServicio() {
    this.dialog.open(ModalServicioComponent, {
        disableClose: true,
      }).afterClosed().subscribe(resultado => {
        if(resultado === "true")this.obtenerServicios();
      });
  }

  
  editarServicio(servicio: Servicio) {
    this.dialog.open(ModalServicioComponent, {
      disableClose: true,
      data:servicio
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")this.obtenerServicios();
    });
  }

  eliminarServicio(servicio: Servicio) {
    Swal.fire({
      title: '¿Desea elimiar el servicio',
      text: servicio.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, Volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._servicioServicio.eliminar(servicio.idServicio).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta(
                'El servicio fue eliminado',
                'Listo!'
              );
              this.obtenerServicios();
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
