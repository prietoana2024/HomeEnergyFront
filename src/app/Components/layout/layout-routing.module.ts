import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { ServicioComponent } from './Pages/servicio/servicio.component';
import { VentaComponent } from './Pages/venta/venta.component';
import { HistorialVentaComponent } from './Pages/historial-venta/historial-venta.component';
import { ReporteComponent } from './Pages/reporte/reporte.component';
import { EstadoComponent } from './Pages/estado/estado.component';
import { ClienteComponent } from './Pages/cliente/cliente.component';
import { ProspectoComponent } from './Pages/prospecto/prospecto.component';
import { CotizacionComponent } from './Pages/cotizacion/cotizacion.component';
import { MisCotizacionesComponent } from './Pages/mis-cotizaciones/mis-cotizaciones.component';
import { SimulacionComponent } from './Pages/simulacion/simulacion.component';
import { FinanciamientoComponent } from './Pages/financiamiento/financiamiento.component';
import { BarChartComponent } from './Pages/bar-chart/bar-chart.component';
import { UploadComponent } from './Pages/upload/upload.component';
import { ProspectoImgComponent } from './Pages/prospecto-img/prospecto-img.component';
import { ValidatorsComponent } from './Pages/validators/validators.component';
import { BibliotecaComponent } from './Pages/biblioteca/biblioteca.component';
import { FileComponent } from './Pages/file/file.component';
import { PdfComponent } from './Pages/pdf/pdf.component';
import { CotizacionCompleteComponent } from './Pages/cotizacion-complete/cotizacion-complete.component';

const routes: Routes = [{
  path:'',
  component:LayoutComponent,
  children:[
    {path:'dashboard',component:DashBoardComponent},
    {path:'usuarios',component:UsuarioComponent},
    {path:'servicios',component:ServicioComponent},
    {path:'venta',component:VentaComponent},
    {path:'historial_venta',component:HistorialVentaComponent},
    {path:'reportes',component:ReporteComponent},
    {path:'estado',component:EstadoComponent},
    {path:'clientes',component:ClienteComponent},
    {path:'prospectos',component:ProspectoComponent},
    {path:'cotizacion',component:CotizacionComponent},
    {path:'mis-cotizaciones',component:MisCotizacionesComponent},
    {path:'simulacion',component:SimulacionComponent},
    {path:'financiamiento',component:FinanciamientoComponent},
    {path:'bar-chart',component:BarChartComponent},
    {path:'upload',component:UploadComponent},
    {path:'prospecto-img',component:ProspectoImgComponent},
    {path:'validators',component:ValidatorsComponent},
    {path:'biblioteca',component:BibliotecaComponent},
    {path:'file',component:FileComponent},
    {path:'pdf1',component:PdfComponent},
    {path:'cotizacionCompleta',component:CotizacionCompleteComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
