import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ResponseApi } from 'src/app/Interfaces/response-api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { ImagenService } from 'src/app/Services/imagen.service';
import { Imagen } from 'src/app/Interfaces/imagen';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imagenName:string;
  name:string='';
  file:any;
  frm!:FormGroup;
  // product:Product = {id:0,productName:'',productImage:''};
  imageFile?:File;
  rsp!:ResponseApi;

  prospectImage:any;

  constructor(private _imagenServicio:ImagenService,
    private fb:FormBuilder,private _utilidadServicio: UtilidadService) { }

  ngOnInit(): void {
    
    this.frm=this.fb.group({
      'idImagen':[0],
      'nombre':['Nombre'],
      'imageFile':['']
    })
  }
  onChange(event:any){
    this.imageFile=event.target.files[0];

    let reader=new FileReader();
    this.file=event.target.files[0];

    reader.readAsDataURL(event.target.files[0]);

    reader.onload=()=>{
    this.prospectImage=reader.result;
   }}
   onPost(){
    this.rsp= {status:true,msg:'wait..',value:'wait..'}
    
    const frmData:Imagen= Object.assign(this.frm.value);
    frmData.imageFile=this.imageFile;
    if(frmData.nombre=""){
      frmData.nombre="miNombre++"
    }
    
    // we will call our service, and pass this object to it
    this._imagenServicio.add(frmData).subscribe({
      next:(data)=>{
        this.rsp=data;
        alert("El recurso a sido cargado con exito");
      },
      error: (err)=>{
       this.rsp= {status:false,msg:'Cargado',value:'wait..'}
        console.log(err);
      }
    })
    this.frm=this.fb.group({
      'idImagen':[0],
      'nombre':[''],
      'imageFile':['']
    })
  }
}
