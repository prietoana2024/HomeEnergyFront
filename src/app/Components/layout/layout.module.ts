import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { ServicioComponent } from './Pages/servicio/servicio.component';
import { VentaComponent } from './Pages/venta/venta.component';
import { HistorialVentaComponent } from './Pages/historial-venta/historial-venta.component';
import { ReporteComponent } from './Pages/reporte/reporte.component';
import { EstadoComponent } from './Pages/estado/estado.component';
import { ClienteComponent } from './Pages/cliente/cliente.component';
import { ProspectoComponent } from './Pages/prospecto/prospecto.component';
import { ModalUsuarioComponent } from './Modales/modal-usuario/modal-usuario.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { ModalServicioComponent } from './Modales/modal-servicio/modal-servicio.component';
import { ModalEstadoComponent } from './Modales/modal-estado/modal-estado.component';
import { ModalProspectoComponent } from './Modales/modal-prospecto/modal-prospecto.component';
import { CotizacionComponent } from './Pages/cotizacion/cotizacion.component';
import { MisCotizacionesComponent } from './Pages/mis-cotizaciones/mis-cotizaciones.component';
import { SimulacionComponent } from './Pages/simulacion/simulacion.component';
import { ModalPruebaComponent } from './Modales/modal-prueba/modal-prueba.component';
import { FormsModule } from '@angular/forms';
import { ModalCotizacionComponent } from './Modales/modal-cotizacion/modal-cotizacion.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FinanciamientoComponent } from './Pages/financiamiento/financiamiento.component';
import { BarChartComponent } from './Pages/bar-chart/bar-chart.component';
import { UploadComponent } from './Pages/upload/upload.component';
import { ProspectoImgComponent } from './Pages/prospecto-img/prospecto-img.component';
import { ModalDetalleVentaComponent } from './Modales/modal-detalle-venta/modal-detalle-venta.component';
import { ValidatorsComponent } from './Pages/validators/validators.component';
import { BibliotecaComponent } from './Pages/biblioteca/biblioteca.component';
import { ModalUploadImageComponent } from './Modales/modal-upload-image/modal-upload-image.component';
import { FileComponent } from './Pages/file/file.component';
import { ModalUploadComponent } from './Modales/modal-upload/modal-upload.component';
import { PdfComponent } from './Pages/pdf/pdf.component';
import { CotizacionCompleteComponent } from './Pages/cotizacion-complete/cotizacion-complete.component';
import { ModalSimulacionPdfComponent } from './Modales/modal-simulacion-pdf/modal-simulacion-pdf.component';
import { DetalleComponent } from './Pages/detalle/detalle.component';
import { DashBoardVComponent } from './Pages/dash-board-v/dash-board-v.component';
import { ServicioVComponent } from './Pages/servicio-v/servicio-v.component';
import { ProspectoVComponent } from './Pages/prospecto-v/prospecto-v.component';
import { ModalClienteComponent } from './Modales/modal-cliente/modal-cliente.component';
import { ModalCalendarioInstalacionComponent } from './Modales/modal-calendario-instalacion/modal-calendario-instalacion.component';
import { FormularioSelectComponent } from './Pages/formulario-select/formulario-select.component';
import { ModalClienteEditComponent } from './Modales/modal-cliente-edit/modal-cliente-edit.component';
import { RelacionClienteUsuarioComponent } from './Pages/relacion-cliente-usuario/relacion-cliente-usuario.component';
import { ClienteVComponent } from './Pages/cliente-v/cliente-v.component';
import { ModalFormCotizacionComponent } from './Modales/modal-form-cotizacion/modal-form-cotizacion.component';
@NgModule({
  declarations: [
    DashBoardComponent,
    UsuarioComponent,
    ServicioComponent,
    VentaComponent,
    HistorialVentaComponent,
    ReporteComponent,
    EstadoComponent,
    ClienteComponent,
    ProspectoComponent,
    ModalUsuarioComponent,
    ModalServicioComponent,
    ModalEstadoComponent,
    ModalProspectoComponent,
    CotizacionComponent,
    MisCotizacionesComponent,
    SimulacionComponent,
    ModalPruebaComponent,
    ModalCotizacionComponent,
    FinanciamientoComponent,
    BarChartComponent,
    UploadComponent,
    ProspectoImgComponent,
    ModalDetalleVentaComponent,
    ValidatorsComponent,
    BibliotecaComponent,
    ModalUploadImageComponent,
    FileComponent,
    ModalUploadComponent,
    PdfComponent,
    CotizacionCompleteComponent,
    ModalSimulacionPdfComponent,
    DetalleComponent,
    DashBoardVComponent,
    ServicioVComponent,
    ProspectoVComponent,
    ModalClienteComponent,
    ModalCalendarioInstalacionComponent,
    FormularioSelectComponent,
    ModalClienteEditComponent,
    RelacionClienteUsuarioComponent,
    ClienteVComponent,
    ModalFormCotizacionComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    FormsModule,
    NgxChartsModule,
    FormsModule
  ]
})
export class LayoutModule { }
