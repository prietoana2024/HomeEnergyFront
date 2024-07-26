
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FileData } from 'src/app/Interfaces/file-data';
import {FormBuilder,FormGroup} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';

import { FileService } from 'src/app/Services/file.service';
import { File } from 'src/app/Interfaces/file';
import { ModalUploadComponent } from '../../Modales/modal-upload/modal-upload.component';

import { ImagenDownload } from 'src/app/Interfaces/imagen-download';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit ,AfterViewInit {

  name:string;
  frm!:FormGroup;
  imagenDownload:ImagenDownload;

  listaBoxFiles:File[]=[];

  columnasTabla: string[] = ['name','path','contentType','fileFormat','acciones'];
  dataInicio: FileData[] = [];
  dataListaFiles = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  files: any = [];
  



  constructor(private dialog: MatDialog,
    private _fileServicio: FileService,
    private _utilidadServicio: UtilidadService,
    private fb:FormBuilder,
    private clipboard: Clipboard) {

      this._fileServicio.GetAllFile().subscribe({
        next:(data)=>{
          if(data.status)
          this.listaBoxFiles=data.value;
        },

        error:(e)=>{}
      });
     }

  
    obtenerServicios() {
      this._fileServicio.GetAllFile().subscribe({
        next: (data) => {
          if (data.status) {
            this.dataListaFiles.data = data.value;
            console.log(this.dataListaFiles);
          } else
            this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
        },
        error: (e) => {}
      });
    }
  
    ngOnInit(): void {
      this.obtenerServicios();
      this.frm=this.fb.group({
        'idImagen':[0],
        'nombre':['Nombre'],
        'idFile':['']
      });
    }
  
    ngAfterViewInit(): void {
      this.dataListaFiles.paginator = this.paginacionTabla;
    }
  
    aplicarFiltroTabla(event: Event) {
    
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataListaFiles.filter = filterValue.trim().toLowerCase();
    }
    addFile() {
      this.dialog.open(ModalUploadComponent, {
          disableClose: true,
        }).afterClosed().subscribe(resultado => {
          if(resultado === "true")this.obtenerServicios();
        });
    }
    trackByItems(index:number,listaProspectos:any):number{
      return listaProspectos.idFile;
    }
    eliminarFile(id:number) {
      console.log(id);
      Swal.fire({
        title: '¿Desea elimiar el file?',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Si, Eliminar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, Volver',
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          // we will call our service, and pass this object to it
          console.log("entrando en el metodo");
          this._fileServicio.eliminar(id).subscribe({
            next: (data) => {
              if (data.status) {
                this._utilidadServicio.mostrarAlerta(
                  'El recurso fue eliminado',
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
    copiar(name:string) {
      this.clipboard.copy(name);
    }
    downloadFile(FileData:File) {
     const id=FileData.idFile;
      Swal.fire({
        title: '¿Desea descargar el file?',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Si, Descargar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, Volver',
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          // we will call our service, and pass this object to it
          console.log("ACTIVAR METODO");
          /*this._fileServicio.downloadFile(id).subscribe({
            next: (data:any) => {
              var blob = new Blob([data]);
              console.log(blob);
              const url= window.URL.createObjectURL(blob);
              var url="http://localhost:58372/"+blob;
              window.open(url);
              console.log("EXITO");
              if (data!=null) {
                this._utilidadServicio.mostrarAlerta(
                  'El recurso fue eliminado',
                  'Listo!'
                );
                this.obtenerServicios();
                console.log("salio el metodo");
               
              } else {
                this._utilidadServicio.mostrarAlerta(
                  'No se pudo eliminar',
                  'Error'
                );
              }
            },
            error: (e) => {},
          });*/
        }
      });
    }
    downloadfile(data: any) {
      var blob = new Blob([data], { type: 'application/octet-stream' });
      console.log(blob);
      var url= window.URL.createObjectURL(blob);
      window.open(url);
  }
  
    /*
    downloadFile(id: number, contentType: string)
  {
    return this.http.get(`http://localhost:48608/FileManager/${id}`, {responseType: 'blob'})
    .subscribe((result: Blob) => {
      const blob = new Blob([result], { type: contentType }); // you can change the type
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      console.log("Success");
  });
  }*/

}
