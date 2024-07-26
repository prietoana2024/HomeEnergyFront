import { Component, OnInit,EventEmitter, Input,Output  } from '@angular/core';
import { DetalleVenta } from 'src/app/Interfaces/detalle-venta';
import { MatTableDataSource } from '@angular/material/table';

//import * as pdfMake from  'pdfmake/build/pdfmake.js';
//import * as pdfFonts from  'pdfmake/build/vfs_fonts';
//{pdfMake as any}.vfs = pdfFonts.pdfMake.vfs;import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer } from '@angular/platform-browser';
import {FormControl } from '@angular/forms';


import { PdfService } from 'src/app/Services/pdf.service';
import { first } from 'rxjs';

//MIS COMPONENTES DE LA GRAFICA

import { IBarChart } from 'src/app/Interfaces/charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';

export const DATA_BAR_CHART:IBarChart[]=[
  {
    "name": "Inicial",
    "value": 0
  }
];
import { FormBuilder,FormGroup,Validators,FormsModule, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  form = new FormGroup({
    first: new FormControl('Nancy', Validators.minLength(2)),
    last: new FormControl('Drew'),
  });

  get first(): any {
    return this.form.get('first');
  }

  onSubmit(): void {
    console.log(this.form.value); // {first: 'Nancy', last: 'Drew'}
    console.log(this.form.value.first);
    console.log(this.form.value.last);

    
  }

  name = 'Angular';

  data = [
    { 'name' : "> 95", 'value' : 765 },
    {'name' : "90 - 94", 'value' : 123},
    {'name' : "< 90", 'value' : 84}
  ]

  //FEHCA DE HOY

  date = new Date();
  //componente de acepto 
  //GRAFICAS 
  //data:IBarChart[]=[];
  view: [number,number] = [500,500];
  colorScheme: Color = { domain: ['#76ff03', '#ffeb3b', '#ff0000', '#40c4ff',], group: ScaleType.Ordinal, selectable: true, name: 'Customer Usage', };

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  //GRAFICAS TERMINA
  

  public logoDataUrl:'https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg;'
  public imagen1:string;
  public imagen2:string;
  public imagen3:string;
  public imagen4:string;
  public firmaCliente:string;
  public firmaHomeEnergy:string;
  
  public previsualizacion1:string;
  public previsualizacion2:string;
  public previsualizacion3:string;
  public previsualizacion4:string;
  public previsualizacion5:string;
  public previsualizacion6:string;
  public loading:boolean;
  public archivos:any=[];

  pruebaNombre:"INSERTANDO NOMBRE";
  employees:any[]=[];

  constructor(
    public pdfService:PdfService,
    private sanitizer:DomSanitizer
  ) 
  { 
    /*
   this.formOrden=this._formOrden.group({
      nombre:['Diana',Validators.required],
      telefono:[2525856,Validators.required],
      email:['prietoana321@gmail.com',[Validators.required, Validators.email]],
      direccion:[' calle 61#43-54',Validators.required],
      tipoIdentificacion:['CC',Validators.required],
      identificacion:[1127065630,Validators.required],
      socEin:[252525,Validators.required],
      tamanoSistema:['GRANDE',Validators.required],
      pagoTotal:['2535.25',Validators.required],
      pagoInicial:[2525,Validators.required],
      notas:['ESTAS SON LÑAS NOTAS DE FORM'],
      url1:['https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1.jpg',Validators.required],
      url2:['https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1.jpg',Validators.required],
      url3:['https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1.jpg',Validators.required],
      url4:['https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1.jpg',Validators.required]
    });
*/
  }


  ngOnInit(): void {
//COMPONENTE DE LA GRAFICA
  }

  capturarFile1(event):any{


    const archivoCapturado=event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
     this.previsualizacion1=imagen.base;
     console.log(imagen);
    })
    this.archivos.push(archivoCapturado);
    const datos = [this.archivos.map((item, index) => {
      console.log('posicion array:', index, item)
                  return item
    })]
 }
  capturarFile2(event):any{


    const archivoCapturado=event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
     this.previsualizacion2=imagen.base;
     console.log(imagen);
    })
    this.archivos.push(archivoCapturado);
    const datos = [this.archivos.map((item, index) => {
      console.log('posicion array:', index, item)
                  return item
    })]

 }
 capturarFile3(event):any{


  const archivoCapturado=event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
   this.previsualizacion3=imagen.base;
   console.log(imagen);
  })
  this.archivos.push(archivoCapturado);
  const datos = [this.archivos.map((item, index) => {
    console.log('posicion array:', index, item)
                return item
  })]

}
capturarFile4(event):any{


  const archivoCapturado=event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
   this.previsualizacion4=imagen.base;
   console.log(imagen);
  })
  this.archivos.push(archivoCapturado);
  const datos = [this.archivos.map((item, index) => {
    console.log('posicion array:', index, item)
                return item
  })]

}
capturarFile5(event):any{


  const archivoCapturado=event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
   this.previsualizacion5=imagen.base;
   console.log(imagen);
  })
  this.archivos.push(archivoCapturado);
  const datos = [this.archivos.map((item, index) => {
    console.log('posicion array:', index, item)
                return item
  })]

}
capturarFile6(event):any{


  const archivoCapturado=event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
   this.previsualizacion6=imagen.base;
   console.log(imagen);
  })
  this.archivos.push(archivoCapturado);
  const datos = [this.archivos.map((item, index) => {
    console.log('posicion array:', index, item)
                return item
  })]

}
  extraerBase64=async($event:any)=>new Promise((resolve,reject)=>{
    try{
      const unsafeImg=window.URL.createObjectURL($event);
      const image=this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader=new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          blob:$event,
          image,
          base:reader.result
        });
    };
    reader.onerror=error=>{
      resolve({
        blob:$event,
        image,
        base:null
      });
    };
   }
   catch(e){
    return null;
   }
   });

   /* downloadPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).download();
  }
  
  openPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
  }

  openSameWindowPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open({}, window);
  }

  printPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).print();
  }*/

  async crearPDF(){
  
  const imagenPortada=this.previsualizacion1;
  const image2=this.previsualizacion2;
  const image3=this.previsualizacion3;
  const image4=this.previsualizacion4;
  const firmaCliente=this.previsualizacion5;
  const firmaHomeEnergy=this.previsualizacion6;

  let firtName:string ='Dayna';
  let lastName:string ='Garcia';
  let direction:string ='4448 Stewart Ave, Las Vegas, NV 89110, USA';
  let number:string ='Dayna Garcia';
  let datetime:string ='1916-04-26';
  let auditor:string ='Mario Gonzalez';
  let numeroVenta:string ='0005';

 let  listaServiciosParaVenta:DetalleVenta[]=[];
 let datosDetalleVenta=new MatTableDataSource(listaServiciosParaVenta);

 var dataServicesAdd=[
  {cantidad:20,descripcionServicio:"ATTILNC SOLUCTION",precioTexto:"250",totalTexto:"5858"},
  {cantidad:20,descripcionServicio:"ROOF",precioTexto:"250",totalTexto:"5858"},
  {cantidad:20,descripcionServicio:"H3",precioTexto:"250",totalTexto:"5858"},
  {cantidad:20,descripcionServicio:"H4",precioTexto:"250",totalTexto:"5858"}
 ];


  var serviceCantidad0=0;
  var servicedescripcionServicio0="Nombre";
  var serviceprecioTexto0="Precio";
  var servicetotalTexto0="Total";

  var serviceCantidad1=0;
  var servicedescripcionServicio1="Nombre";
  var serviceprecioTexto1="Precio";
  var servicetotalTexto1="Total";

  var serviceCantidad2=0;
  var servicedescripcionServicio2="Nombre";
  var serviceprecioTexto2="Precio";
  var servicetotalTexto2="Total";

  var serviceCantidad3=0;
  var servicedescripcionServicio3="Nombre";
  var serviceprecioTexto3="Precio";
  var servicetotalTexto3="Total";

for(var i=0;i<dataServicesAdd.length;i++){
  console.log("---------");
  console.log(dataServicesAdd[i].cantidad);
  console.log(dataServicesAdd[i].descripcionServicio);
  console.log(dataServicesAdd[i].precioTexto);
  console.log(dataServicesAdd[i].totalTexto);
  if(i==0){
    
    servicedescripcionServicio0=dataServicesAdd[i].descripcionServicio;
    serviceCantidad0=dataServicesAdd[i].cantidad;
    serviceprecioTexto0=dataServicesAdd[i].precioTexto;
    servicetotalTexto0=dataServicesAdd[i].totalTexto;
    }
    if(i==1){
     
      servicedescripcionServicio1=dataServicesAdd[i].descripcionServicio;
      serviceCantidad1=dataServicesAdd[i].cantidad;
      serviceprecioTexto1=dataServicesAdd[i].precioTexto;
      servicetotalTexto1=dataServicesAdd[i].totalTexto;
    }
    if(i==2){
      
      servicedescripcionServicio2=dataServicesAdd[i].descripcionServicio;
      serviceCantidad2=dataServicesAdd[i].cantidad;
      serviceprecioTexto2=dataServicesAdd[i].precioTexto;
      servicetotalTexto2=dataServicesAdd[i].totalTexto;
        }
    if(i==3){
      
      servicedescripcionServicio3=dataServicesAdd[i].descripcionServicio;
      serviceCantidad3=dataServicesAdd[i].cantidad;
      serviceprecioTexto3=dataServicesAdd[i].precioTexto;
      servicetotalTexto3=dataServicesAdd[i].totalTexto;
        }

    }

    let username: string = "codingpotions";
    const data = [    ['Name', 'Email', 'Country'],
    [auditor, 'johndoe@example.com', 'USA'],
    ['Jane Smith', 'janesmith@example.com', 'Canada'],
    ['Bob Johnson', 'bobjohnson@example.com', 'UK']
  ];

  const dataServices = [    ['Servicio', 'Pulgadas2', 'Precio x pulgada','Total'],
    [servicedescripcionServicio0,serviceCantidad0, serviceprecioTexto0,servicetotalTexto0],
    [servicedescripcionServicio1,serviceCantidad1, serviceprecioTexto1,servicetotalTexto1],
    [servicedescripcionServicio0,serviceCantidad0, serviceprecioTexto0,servicetotalTexto0],
    [servicedescripcionServicio1,serviceCantidad1, serviceprecioTexto1,servicetotalTexto1]
  ];

  const totalPagarTxt='totalPagarTxt';

  const totalInteresTxt='totalInteresTxt';

  const interesxMesTxt='interesxMesTxt';

  const comisionesTxt='comisionesTxt';

  const valorCuotaTxt='valorCuotaTxt';


  const ahorraTxt='ahorraTxt';

  

  //EXPORT GRAFICA



  const docDefinition:any= {
    content: [
      {image: 'data:image/png;base64,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',
       width: 250,
       height: 70,
       margin: [0, 0, 0, 15]
      },
      {image: 'data:image/png;base64,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',
       width: 500,
       height: 10},
      {image: 'data:image/jpeg,'+imagenPortada,
       width: 500,
       height: 500,
       margin: [15, 0, 0, 15]},
      {image: 'data:image/png;base64,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',
       width: 500,
       height: 10,
       margin: [0, 0, 0, 15]},
       {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Propuesta para:'
            
          },
          {
            // percentage width
            width: '50%',
            text:firtName
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Dirección'
            
          },
          {
            // percentage width
            width: '50%',
            text:direction
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Numero de teléfono'
            
          },
          {
            // percentage width
            width: '50%',
            text:number
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Fecha'
            
          },
          {
            // percentage width
            width: '50%',
            text:datetime
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'Auditor'
            
          },
          {
            // percentage width
            width: '50%',
            margin: [0, 0, 0, 100],
            text:auditor
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      { text: 'Energy Efficient Report',style: 'section1'},
      { table: { 

        widths: ['*', 'auto', 100, '*'],

        body: dataServices
      }},
      {text: "This is an agreement that all work described on this report will be completed. Customer understands the timeline in which jobs will be completed as explained by the representative.",margin: [0, 20, 0, 20]},
      { text: 'Report financing',style: 'section1'},
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'TOTAL A PAGAR'
            
          },
          {
            // percentage width
            width: '50%',
            text:totalPagarTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'TOTAL INTERES'
            
          },
          {
            // percentage width
            width: '50%',
            text:totalInteresTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'TOTAL INTERES X MES'
            
          },
          {
            // percentage width
            width: '50%',
            text:interesxMesTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'COMISIONES'
            
          },
          {
            // percentage width
            width: '50%',
            text:comisionesTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'VALOR PROMEDIO DE LA CUOTA'
            
          },
          {
            // percentage width
            width: '50%',
            text:valorCuotaTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: 'VALOR AHORRADO'
            
          },
          {
            // percentage width
            width: '50%',
            text:ahorraTxt
          }
        ],
        // optional space between columns
        columnGap: 10
      },

      { text: 'Release of reability',style: 'section1',margin: [0, 0, 0, 20]},
      {text: [
        { text: 'This General Release (this “Release”) is made on', fontSize: 14},'   '+
        this.date+'   ',
        { text: 'between', fontSize: 14},'   '+
        firtName+'  '+lastName,'  and  '+'Home Energy.'
      ],margin: [0, 0, 0, 20]},
      {text:'1. Releasor and anyone claiming on behalf of Releasor releases and forever discharges Releasee and its af/liates, successors and assigns, of/cers, employees, representatives, partners, agents and anyone claiming through them (collectively, the  Released Parties”), in their individual and3or corporate capacities from any and all claims outside the scope of Solar installation and liabilities, obligations, promises, agreements, disputes, demands, damages, causes of action of any nature and kind, known or unknown, which Releasor has or ever had or may in the future have against Releasee or any of the Released Parties arising out of or relating to: Adders to the system outside the scope of Solar Installation.(“Claims”).',margin: [0, 0, 0, 20]},

      {text:'2. This Release shall not be in any way construed as an admission by the Releasee that it has acted  wrongfully with respect to Releasor or any other person, that it admits liability or responsibility at anytime for any purpose, or that Releasor has any rights whatsoever against the Releasee.',margin: [0, 0, 0, 20]},

      {text:'3. This Release shall be binding upon and inure to the bene/t of the parties and their respective heirs administrators, personal representatives, executors, successors and assigns. Releasor has the authority to release the Claims and has not assigned or transferred any Claims to any other party. The provisions of this Release are severable. If any provision is held to be invalid or unenforceable, it shall not affect the validity or enforceability of any other provision. This Release constitutes the entire agreement between the parties and supersedes any and all prior oral or written agreements or understandings between the parties concerning the subject matter of this Release. This Release may not be altered, amended or modi/ed, except by a written document signed by both parties. The terms of this Release shall be governed by and construed in accordance with the laws of the State3Commonwealth of Home energy.',margin: [0, 0, 0, 20]},

      {text:'4. Both parties represent they fully understand their right to review all aspects of this Release with attorneys of their choice, that they have had the opportunity to consult with attorneys of their choice, that they have carefully read and fully understand all the provisions of this Release and that they are freely, knowingly and voluntarily entering into this Release.',margin: [0, 0, 0, 20]},

      {text:'Customer Signature:', fontSize: 14},

      {image: 'data:image/jpeg,'+firmaCliente,
       width: 200,
       height: 200,
       margin: [15, 0, 0, 550]},
      {image: 'data:image/png;base64,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',
       width: 500,
       height: 10,margin: [0, 0, 0, 20]},
       { text: 'Additional Adders Completion Agreement', fontSize: 20,margin: [0, 0, 0, 20]},

       { text: 'Customer information:', fontSize: 20,margin: [0, 0, 0, 20]},

       {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Name:'
          },
          {
            // percentage width
            
            width: '50%',
            text:firtName+'  '+lastName
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Telefono'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.form.value.first
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Email'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.form.value.first
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Address'
          },
          {
            // percentage width
            
            width: '50%',
            text:direction
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Identificacion'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.form.value.first+'  '+this.form.value.first
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Soc/Ein'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.form.value.first
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Tamaño del Sistema'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.form.value.first
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Pago Total'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.form.value.first
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Pago Inicial'
          },
          {
            // percentage width
            
            width: '50%',
            text:this.form.value.first
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      { text: 'Incentive/Adders Descriptions', fontSize: 20,margin: [0, 0, 0, 20]},
      { text: 'The Undersigned parties agree to the installation of the renewable energy system described in the home Installation Contract. Additionally, the Undersigned parties agree to the ful/llment of any additional equipament described above, whether by issuing payment or physical installation of adders. +y signing this document the home owner is stating that all additional eOuipment3adders and incentives have been ful/lled or paid for. There are no other promises, conditions, understandings or other agreements, whether oral or written, relating to the subject matter of this Agreement.', fontSize: 14,margin: [0, 0, 0, 20]},
      { text: 'Home Energy Rep Signature:', fontSize: 14,margin: [0, 0, 0, 20]},
      {image: 'data:image/jpeg,'+ firmaHomeEnergy,
       height: 100,
       width:100,
       margin: [0, 100, 0, 150]},
       {image: 'data:image/png;base64,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',
       width: 500,
       height: 10,margin: [0, 0, 0, 20]},
       { text: 'Assesment', fontSize: 20,margin: [0, 0, 0, 20]},
       { text: 'Notas', fontSize: 14,margin: [0, 0, 0, 20]},
       { text:this.form.value.first, fontSize: 14,margin: [0, 0, 0, 20]},

       { text: 'Multimedia adicional:', fontSize: 20,margin: [0, 0, 0, 20]},
       {image: 'data:image/jpeg,'+ image2,
       height: 400,
       width:300,
       margin: [0, 10, 0, 10]},
       {image: 'data:image/jpeg,'+ image3,
       height: 400,
       width:300,
       margin: [0, 10, 0, 10]},
      {image: 'data:image/jpeg,'+ image4,
       height: 400,
       width:300,
       margin: [0, 10, 0, 10]},
      {text: [
        { text: 'Customer Signature:', fontSize: 14},'   '+
        this.date+'   ',
        { text: 'between', fontSize: 14},'   '+
        firtName+'  '+lastName,'  and  '+'Home Energy.'
      ]},
      {
        columns: [
          {
            // fixed width
            width: '50%',
            text: 'Last column'
          },
          {
            // percentage width
            
            width: '50%',
            text: 'Last column'
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      { table: { body: data } },
       { text: 'Propuesta para:',style: 'section1'},
       { text:' - '+firtName+'  '+lastName,style: 'section1'},

       //date
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: '50%',
            text: [
              { text: 'PROPUESTA PARA', fontSize: 20},'   '+
              firtName+ '  '+lastName,
              { text: 'restyle part of it and make it bigger ', fontSize: 40 },
              'than the rest.'
            ]
            
          },
          { width: '50%',
          text: 'Energy Report'}
          
        ],
        // optional space between columns
        columnGap: 10
      },
      {image: 'data:image/jpeg,'+imagenPortada,
       width: 500,
       height: 500},
       { text: 'User Data',style: 'section1'},
       {
        text: [
          datosDetalleVenta.data,
          { text: 'restyle part of it and make it bigger ', fontSize: 40 },
          'than the rest.'
        ]
      },
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Energy Report'
            
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: 'Second column'
          },
          {
            // fixed width
            width: 100,
            text: 'Third column'
          },
          {
            // percentage width
            width: '10%',
            text: 'Last column'
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ['*', 'auto', 100, '*'],

          body: [
            ['First', 'Second', 'Third', 'The last one'],
            ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
            [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
          ]
        }
      },
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 0] },
      section1: { fontSize: 28, bold: true, margin: [0, 0, 0, 0],with:800,fontfamily: 'Helvetica'},
    }
  };

  this.pdfService.open(docDefinition);
  }
/*CON EL MODELO PARA IMAGEN EN 64*/
/*async crearPDF(){
  let username: string = "codingpotions";
  const data = [    ['Name', 'Email', 'Country'],
  [username, 'johndoe@example.com', 'USA'],
  ['Jane Smith', 'janesmith@example.com', 'Canada'],
  ['Bob Johnson', 'bobjohnson@example.com', 'UK']
];

const docDefinition:any= {
  content: [
    { text: 'User Data', style: 'header' },
    { table: { body: data } },
    { text: 'User Data'},
    {image: 'data:image/jpeg,',
     width: 100,
     height: 100},
  ],
  styles: {
    header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
  }
};

this.pdfService.open(docDefinition);
}*/
  async generatePdf() {
    const def = {content: [
      {
        table: {
          widths: ['*','auto',150,'*'],
          body: [
              ['Nro','Nombre','Apellidos','Dni'],
              ['001','Pepe','Suarez','7041654'],
              ['002','Miguel','Sanchez','8787997'],
              ['003','Juan', [ {text: ['Suarez ', {text:'Benites',bold:true}]} ],'8787997']
          ],
          headerRows: 1
      }
  }
  ]    };
    this.pdfService.open(def);
  }
  
  async generarPDF(){
    const def:any={
      content:[
        {
          text: 'This is a header, using header style+this.pruebaNombre',
          style: 'header'
        },
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
        {
          text: 'Subheader 1 - using subheader style',
          style: 'subheader'
        },
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
        {
          text: 'Subheader 2 - using subheader style',
          style: 'subheader'
        },
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
        {
          text: 'It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties',
          style: ['quote', 'small']
        },
        'Images can be also provided in dataURL format...',
        {
              image: 'data:image/jpeg;base64,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AAGyAAAAEAAAAAEAAAAAABJwcmludE91dHB1dE9wdGlvbnMAAAASAAAAAENwdG5ib29sAAAAAABDbGJyYm9vbAAAAAAAUmdzTWJvb2wAAAAAAENybkNib29sAAAAAABDbnRDYm9vbAAAAAAATGJsc2Jvb2wAAAAAAE5ndHZib29sAAAAAABFbWxEYm9vbAAAAAAASW50cmJvb2wAAAAAAEJja2dPYmpjAAAAAQAAAAAAAFJHQkMAAAADAAAAAFJkICBkb3ViQG/gAAAAAAAAAAAAR3JuIGRvdWJAb+AAAAAAAAAAAABCbCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBSAAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAB4OEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgABOEJJTQQCAAAAAAAEAAAAADhCSU0EMAAAAAAAAgEBOEJJTQQtAAAAAAAGAAEAAAACOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA0sAAAAGAAAA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aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNC0wMy0xOVQwMzowMjoyNiswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxNC0wMy0xOVQwMzowMjoyNiswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTQtMDMtMTlUMDM6MDI6MjYrMDE6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI4MDExNzQwNzIwNjgxMTg3MUY4MTMxRkI2RTY4OTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTg3MUY4MTMxRkI2RTY4OTgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODcxRjgxMzFGQjZFNjg5OCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0MDcyMDY4MTE4NzFGODEzMUZCNkU2ODk4IiBzdEV2dDp3aGVuPSIyMDE0LTAzLTE5VDAzOjAyOjI2KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowMjgwMTE3NDA3MjA2ODExODcxRjgxMzFGQjZFNjg5OCIgc3RFdnQ6d2hlbj0iMjAxNC0wMy0xOVQwMzowMjoyNiswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0IgWFlaIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBzUkdCAAAAAAAAAAAAAAABAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAAFGJrcHQAAAIEAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJAAAAAFGRtbmQAAAJUAAAAcGRtZGQAAALEAAAAiHZ1ZWQAAANMAAAAhnZpZXcAAAPUAAAAJGx1bWkAAAP4AAAAFG1lYXMAAAQMAAAAJHRlY2gAAAQwAAAADHJUUkMAAAQ8AAAIDGdUUkMAAAQ8AAAIDGJUUkMAAAQ8AAAIDHRleHQAAAAAQ29weXJpZ2h0IChjKSAxOTk4IEhld2xldHQtUGFja2FyZCBDb21wYW55AABkZXNjAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAA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',
              width: 200
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }
    }
    this.pdfService.open(def);
  }
  /*
  generatePDF() {
    let docDefinition = {  
      content: 'Trivial way of using pdfmake with angular'  
    };  
   
    pdfMake.createPdf(docDefinition, null, null, pdfFonts.pdfMake.vfs).open();  
}*/
  /*
  generatePDF(){
    let docDefinition:any={ 
      content: [
        'ESTE ES EL PDF'
      ], styles:{}};
      pdfMake.createPdf(docDefinition).open();
  }
  downloadPDF(){
    let docDefinition= { 
      content: [
        'ESTE ES EL PDF'
      ], styles:{}};
      pdfMake.createPdf(docDefinition).download("cotizacion.pdf");
  }
  createPdf(){
    
  }*/
}
