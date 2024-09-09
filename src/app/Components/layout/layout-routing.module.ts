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
import { DetalleComponent } from './Pages/detalle/detalle.component';
import { DashBoardVComponent } from './Pages/dash-board-v/dash-board-v.component';
import { ServicioVComponent } from './Pages/servicio-v/servicio-v.component';
import { ProspectoVComponent } from './Pages/prospecto-v/prospecto-v.component';
import { FormularioSelectComponent } from './Pages/formulario-select/formulario-select.component';
import { RelacionClienteUsuarioComponent } from './Pages/relacion-cliente-usuario/relacion-cliente-usuario.component';
import { ClienteVComponent } from './Pages/cliente-v/cliente-v.component';

const routes: Routes = [{
  path:'',
  component:LayoutComponent,
  children:[
    {path:'dashboard',component:DashBoardComponent},
    {path:'dashboard-v',component:DashBoardVComponent},
    {path:'usuarios',component:UsuarioComponent},
    {path:'servicios',component:ServicioComponent},
    {path:'servicios-v',component:ServicioVComponent},
    {path:'venta',component:VentaComponent},
    {path:'historial_venta',component:HistorialVentaComponent},
    {path:'reportes',component:ReporteComponent},
    {path:'estado',component:EstadoComponent},
    {path:'clientes',component:ClienteComponent},
    {path:'clientes-v',component:ClienteVComponent},
    {path:'prospectos',component:ProspectoComponent},
    {path:'prospectos-v',component:ProspectoVComponent},
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
    {path:'cotizacionC',component:CotizacionCompleteComponent},
    {path:'detalle',component:DetalleComponent},
    {path:'formulario',component:FormularioSelectComponent},
    {path:'relacion-usuario',component:RelacionClienteUsuarioComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
