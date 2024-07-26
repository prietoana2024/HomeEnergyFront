import { Component, OnInit,Inject,AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ProspectoService } from 'src/app/Services/prospecto.service';
import { Charts } from 'src/app/Interfaces/charts';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagenService } from 'src/app/Services/imagen.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProspectoComponent } from '../../Modales/modal-prospecto/modal-prospecto.component';
import { ModalPruebaComponent } from '../../Modales/modal-prueba/modal-prueba.component';
import Swal from 'sweetalert2';
import { ModalUploadImageComponent } from '../../Modales/modal-upload-image/modal-upload-image.component';



@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {

  formularioProspecto:FormGroup;
  code:any;
  prospectImage:any;
  columnasTabla: string[] = ['idProspecto','nombre','fachadaimg','url','direccion','contacto','razonSocial','idauditor','detalle','estado','acciones'];
  dataInicio: Prospecto[] = [];
  dataListaProspecto = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _prospectoServicio:ProspectoService,
    private _utilidadServicio:UtilidadService) 
    { 

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

  ngOnInit(): void {
    this.obtenerProspecto();
  }
  ngAfterViewInit(): void {
    this.dataListaProspecto.paginator = this.paginacionTabla;
  }

  loadingImage() {



    this.dialog.open(ModalUploadImageComponent, {
        disableClose: true,
        data:this.prospectImage
      }).afterClosed().subscribe(resultado => {
        if(resultado === "true")this.obtenerProspecto();
      });
  }

  uploadImage(idProspecto:any,url:any){

    this.prospectImage=url;
    this.code=idProspecto;

    let vegetales = [url,idProspecto];
    const valores={url,idProspecto};

    console.log(valores);

    this.dialog.open(ModalUploadImageComponent, {
        disableClose: true,
        data:vegetales
      }).afterClosed().subscribe(resultado => {
        if(resultado === "true")this.obtenerProspecto();
      });
  }
  removeImage(idProspecto:any,nombre:any){
    if(confirm("¿Deseas eliminar la imagen"+nombre+"?")){

    var code=idProspecto;
    this._prospectoServicio.RemoveImage(code).subscribe(resultado=>{
      this._utilidadServicio.mostrarAlerta(
        'Imagen eliminado',
        'Listo!'
      );
    });
  }
  }/*
  editarImagen(prospecto: Prospecto) {
    this.dialog.open(ModalUploadImageComponent, {
      disableClose: true,
      data:prospecto
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")this.obtenerProspecto();
    });
  }*/
}
