import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaseEditComponent } from '../clase-edit/clase-edit.component';
import { ClaseDeleteComponent } from '../clase-delete/clase-delete.component';

@Component({
  selector: 'app-clase-add',
  templateUrl: './clase-add.component.html',
  styleUrls: ['./clase-add.component.scss']
})
export class ClaseAddComponent implements OnInit {

  isLoading:any = null
  CLASES:any =[]
  title:any = null
  description :any= "<p>Hello, word!!</p>"

  FILES:any=[]

  section_id :any

  constructor(public activedRouter:ActivatedRoute,public courseService:CourseService,public toaster:Toaster,public modalService:NgbModal) { }

  ngOnInit(): void {

    this.activedRouter.params.subscribe((resp:any) => {
      this.section_id = resp.id

    })

    this.isLoading = this.courseService.isLoading$
    this.courseService.listClases(this.section_id).subscribe((resp:any) => {
      console.log(resp);
      this.CLASES = resp.clases.data

    })
  }


  public onChange(event:any){
    this.description = event.editor.getData();

  }

  processFile($event:any){

    for(const file of $event.target.files){
      this.FILES.push(file)
    }

    console.log(this.FILES);

    // if ($event.target.files[0].type.indexOf("image") < 0) {
    //   this.toaster.open({text:'Solo se acepta imagenes',caption:'Mensaje de validacion',type:'danger'})
    //   return;
    // }
    // this.file_portada = $event.target.files[0]
    // let reader = new FileReader();
    // reader.readAsDataURL(this.file_portada)
    // reader.onloadend=()=>this.imagen_previsualiza= reader.result
    // this.courseService.isLoadingSubject.next(true)

    // setTimeout(()=>{
    //   this.courseService.isLoadingSubject.next(false)
    // },50)
  }
  save(){
    if (!this.title) {
      this.toaster.open({text:'Completa todos los campos',caption:'Mensaje de validacion',type:'danger'})
      return;
    }
    if (this.FILES.length == 0) {
      this.toaster.open({text:'Necesitas subir un recurso a la clase',caption:'Mensaje de validacion',type:'danger'})
      return;
    }
    let formData =new FormData()
    formData.append("name",this.title)
    formData.append("description",this.description)
    formData.append("course_section_id",this.section_id)

    this.FILES.forEach((file:any,index:number)=>{
      formData.append("files["+index+"]",file)

    })

    this.courseService.registerClase(formData).subscribe((resp:any)=>{
      console.log(resp);
      this.toaster.open({text:'Se ha registrado la clase',caption:'Exitoso!!',type:'success'})
      this.CLASES.push(resp.clase)
      this.title = null
      this.description = "<p>Hello, word!!</p>"
      this.FILES = []
    })

  }

  editClases(item:any){
    const modalref= this.modalService.open(ClaseEditComponent,{centered:true,size:"md"})
    modalref.componentInstance.clase_selected = item

    modalref.componentInstance.ClaseE.subscribe((claseE:any)=>{
      let INDEX = this.CLASES.findIndex((subitem:any)=>subitem.id === claseE.id)
      this.CLASES[INDEX] = claseE
    })
  }
deleteClases(item:any){
  const modalref = this.modalService.open(ClaseDeleteComponent,{centered:true,size:"sm"})
  modalref.componentInstance.clase_selected = item

  modalref.componentInstance.ClaseD.subscribe((resp: any) => {
    let INDEX = this.CLASES.findIndex((item:any)=>item.id == item.id)
    this.CLASES.splice(INDEX,1)
  })
}
}
