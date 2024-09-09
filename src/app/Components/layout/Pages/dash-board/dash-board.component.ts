import { Component, OnInit } from '@angular/core';
import{Chart,registerables} from  'chart.js';

import { DashBoardService } from 'src/app/Services/dash-board.service';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';

import {MatTabsModule} from '@angular/material/tabs';


Chart.register(...registerables);
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  lotsOfTabs = new Array(15).fill(0).map((_, index) => `Tab ${index}`);

  p:number=1;
  itemsPerPage:number=5;
  totalUsuarios:any;

  title = 'ngBestPractice';
  flag: boolean = true;


  
  name: string = 'Name';

  totalIngresos:string="0";
  totalVentas:string="0";  
  totalServicios:string="0";
  totalCerradas:string="0";
  totalCotizaciones:string="0";
  totalProspectos:string="0";
  

  dataInicio: Usuario[] = [];

  constructor(
    private _dashboardServicio:DashBoardService,
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService

  ) { }

  mostrarGrafico(labelGrafico:any[],dataGrafico:any[]){

    const chartBarras=new Chart('chartBarras',{
      type:'bar',
      data:{
        labels:labelGrafico,
        datasets:[{
          label:"# de ventas",
          data:dataGrafico,
          backgroundColor:[
            'rgba(54,162,236,0.2)'
          ],
          borderColor:[
             'rgba(54,162,235,1)'
          ],
          borderWidth:1
        }]
      },
      options:{
        maintainAspectRatio:false,
        responsive:true,
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
    });

  }

  mostrarGraficoClientes(labelGrafico:any[],dataGrafico:any[]){

    const chartBarrasClientes=new Chart('chartBarrasClientes',{
      type:'bar',
      data:{
        labels:labelGrafico,
        datasets:[{
          label:"# de clientes creados",
          data:dataGrafico,
          backgroundColor:[
            'rgba(54,162,236,0.2)'
          ],
          borderColor:[
             'rgba(54,162,235,1)'
          ],
          borderWidth:1
        }]
      },
      options:{
        maintainAspectRatio:false,
        responsive:true,
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
    });

  }

  ngOnInit(): void {

    this.obtenerUsuarios();


    this._dashboardServicio.resumen().subscribe({

      next:(data)=>{
        if(data.status){
          this.totalIngresos=data.value.totalIngresos;
          this.totalVentas=data.value.totalVentas;
          this.totalServicios=data.value.totalServicios;
          this.totalCerradas=data.value.totalCerradas;
          this.totalCotizaciones=data.value.totalCotizaciones;
          this.totalProspectos=data.value.totalProspectos;


          const arrayData:any[]=data.value.ventasUltimaSemana;

          
          const labelTemp=arrayData.map((value)=>value.fecha);
          const dataTemp=arrayData.map((value)=>value.total);

          const arrayDataClientes:any[]=data.value.clientesUltimaSemana;

          const labelTempClientes=arrayDataClientes.map((value)=>value.fecha);
          const dataTempClientes=arrayDataClientes.map((value)=>value.total);


          console.log(labelTemp,dataTemp);

          this.mostrarGrafico(labelTemp,dataTemp);

          this.mostrarGraficoClientes(labelTempClientes,dataTempClientes);
        }
      }
    })
  }

  obtenerUsuarios() {
    this._usuarioServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataInicio= data.value;
          this.totalUsuarios=data.value.length;
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
}
