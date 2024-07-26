import { Component, OnInit,Inject} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ProspectoService } from 'src/app/Services/prospecto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ImagenService } from 'src/app/Services/imagen.service';
import { Prospecto, archivo } from 'src/app/Interfaces/prospecto';

@Component({
  selector: 'app-modal-upload-image',
  templateUrl: './modal-upload-image.component.html',
  styleUrls: ['./modal-upload-image.component.css'],
  providers:[ImagenService]
})
export class ModalUploadImageComponent implements OnInit {

  imageFile?:File;
  link:string;

  name:string='';
  file:any;

  

    public archivo:Prospecto;
    public archivos:Prospecto;
    public lastPK:number;
    dataInicio: Prospecto[] = [];
 
  image:any;

  formularioProspecto:FormGroup;
  editProspectCode='';
  Result:any;
  progressValue=0;

  constructor(
    private modalActual:MatDialogRef<ModalUploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public prospectImage:any,
    @Inject(MAT_DIALOG_DATA) public code:any,
    @Inject(MAT_DIALOG_DATA) public vegetales:any,
    private fb:FormBuilder,
    private _prospectoServicio:ProspectoService,
    private _utilidadServicio:UtilidadService,
    private _imagenServicio:ImagenService
  ) { 
  }
  getName(name:string){
    this.name=name;
  }
  getFile(event:any){
    this.file=event.target.files[0];
    console.log("file",this.file);
  }

  submitData(){
    let formData=new FormData;
    formData.set("name",this.name);
    formData.set("file",this.file);

    //envio de informacion mediante post

    //this.http.post(environment.apiUrl+'/upload',formData).subscribe((response)=>{});

    this._prospectoServicio.guardarImagen(formData).subscribe({
      
     });
}
  obtenerProspecto() {
    this._prospectoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataInicio = data.value;
          console.log(this.dataInicio);
          this.lastPK=this.dataInicio[data.value.length -1].idProspecto;
          console.log(this.lastPK)
        } else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops");
      },
      error: (e) => {}
    });
  }
///MI PRUEBA DE LA CARGA A BIBLIOTECA
subirArchivo(archivo:Event){
  this._imagenServicio.uploadFile(this.archivo).subscribe({
    next:(data)=>{
      if(data.status){
        this._utilidadServicio.mostrarAlerta("El archivo fue registrado","Exito");
        this.modalActual.close("true")
      }else
      this._utilidadServicio.mostrarAlerta("No se pudo el  archivo Prospecto","Error")
    },
    error:(e)=>{}
   })
}

fileEvent(fileInput:Event){
  let file=(<HTMLInputElement>fileInput.target).files[0];
 
  if(file.type=="image/jpeg" || file.type =="image/png"){
    this.lastPK+1,file.name,file.type;
    console.log(this.archivo);
  }
};
//AQUI TERMINA MI PRUEBA

  ngOnInit(): void {
    this.obtenerProspecto();

    if(this.vegetales!=null){
    let url = this.vegetales[0];
    let code = this.vegetales[this.vegetales.length - 1];

    this.prospectImage=url;
    this.code=code;
    }

    
    
  }
  proceedUpload(){
    let formData=new FormData;
    //formData.append("file",this.file,this.editProspectCode);
    formData.append("files",this.file);
    /*this._prospectoServicio.guardarImagen(formData).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El archivo fue registrado","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo el  archivo Prospecto","Error")
      },
      error:(e)=>{}
     })*/
  }
  setValue() {
    console.log(this.vegetales);
    /*const code=this.valores[url];
    const image=this.valores[idProspecto];*/
    /*this.vegetales.forEach(function (elemento, indice) {

      console.log(elemento, indice);
    });*/
    let url = this.vegetales[0];
    let code = this.vegetales[this.vegetales.length - 1];

    this.prospectImage=url;
    this.code=code;
  }

  onchange(event:any){
    this.imageFile=event.target.files[0];
    let reader=new FileReader();
    this.file=event.target.files[0];

    reader.readAsDataURL(event.target.files[0]);

    reader.onload=()=>{
    this.prospectImage=reader.result;
    }


  }
  /*upload(){


    var fichero=new FormData;

    //formData.append("file",this.file,this.editProspectCode);
    fichero.append("files",this.file,this.editProspectCode);

    this._prospectoServicio.guardarImagen(fichero).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El archivo fue registrado","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo el  archivo Prospecto","Error")
      },
      error:(e)=>{}
     })
  }*/
  
  //enviando un archivo tipo file

  upload(){


    var fichero=new FormData;

    //formData.append("file",this.file,this.editProspectCode);
    fichero.append("files",this.file,this.editProspectCode);

    const archivo=this.file;

    this._prospectoServicio.guardarImagen(archivo).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.mostrarAlerta("El archivo fue registrado","Exito");
          this.modalActual.close("true")
        }else
        this._utilidadServicio.mostrarAlerta("No se pudo el  archivo Prospecto","Error")
      },
      error:(e)=>{}
     })
  }

  save(){
  const code=this.code;
  console.log(code);
  if(this.link==null){

  }else if(this.imageFile!=null){

  }else{
    alert("ingrese informacion")
  }
  }
}
