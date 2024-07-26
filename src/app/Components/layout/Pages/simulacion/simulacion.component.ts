import { Component, OnInit, ViewChild } from '@angular/core';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ProspectoService } from 'src/app/Services/prospecto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { ModalPruebaComponent } from '../../Modales/modal-prueba/modal-prueba.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.css']
})
export class SimulacionComponent implements OnInit {

  listaFiltrada:any;
  listaTarjetas:Prospecto[]=[];
  dataListaProspecto :Prospecto[]=[];
  dataProspectos: Prospecto[] = 
  [
  {
    idProspecto:6,
    nombre:'Mansonry',
    fachadaimg:'fachada solar1.jpeg',
    url:'./../../../../../assets/images/',
    direccion:'calle 51#4354',
    contacto:'Luis Alberto 304356356',
    razonSocial:'CONCRETO',
    idauditor:1,
    detalle:'Reestructuracuiond ndkhnhffuygusbb ',
    esActivo: 1
  },
  {
    idProspecto:7,
    nombre:'Mi casa',
    fachadaimg:'fachada2.jpg',
    url:'./../../../../../assets/images/',
    direccion:'call 55#787878',
    contacto:'Luis 35145485444',
    razonSocial:'CONCLAVE',
    idauditor:1,
    detalle:'DGVDFDFGJbhhfvv f httffhhg',
    esActivo: 1
  },
  {
    idProspecto:8,
    nombre:'Mi casa2',
    fachadaimg:'fachada2.jpg',
    url:'./../../../../../assets/images/',
    direccion:'call 55#787878254',
    contacto:'Luis 35145485444',
    razonSocial:'CONCLAVE JAJAJA',
    idauditor:1,
    detalle:'DGVDFDFGJbhbhhhhfh fgjhfvv f httffhhg',
    esActivo: 1}
  ];

  constructor(
    private _prospectoServicio: ProspectoService,
    private _utilidadServicio: UtilidadService,
    private dialog: MatDialog
    
  ) 
  { 

 
    console.log(this.dataProspectos);
    console.log(this.listaTarjetas);

  }

  obtenerProspecto() {
    this._prospectoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaTarjetas= data.value;
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }

  ngOnInit(): void {
    this.obtenerProspecto();
    this.listaTarjetas=this.listaTarjetas.filter(t => t.nombre.toLowerCase())
    
    
  }
  nuevoProspecto() {
    this.dialog.open(ModalPruebaComponent, {
        disableClose: true,
      }).afterClosed().subscribe(resultado => {
        if(resultado === "true")this.obtenerProspecto();
      });
  }
 
  
}
