import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ClasesFileDeleteComponent } from '../clases-file-delete/clases-file-delete.component';

@Component({
  selector: 'app-clase-edit',
  templateUrl: './clase-edit.component.html',
  styleUrls: ['./clase-edit.component.scss']
})
export class ClaseEditComponent implements OnInit {

  @Input() clase_selected:any
  @Output() ClaseE: EventEmitter<any>= new EventEmitter();

  isLoading:any
  title:any
  description :any
  state:any =1
  FILES:any=[]

  FILES_CLASE :any=[]

  isUploadVideo :boolean = false
  video_curso:any = null
  link_video_clase:any = null

  isUploadFiles:boolean = false


  constructor(public modal :NgbActiveModal,public courseService:CourseService,public toaster:Toaster,private sanitizer: DomSanitizer,public modalService:NgbModal) { }

  ngOnInit(): void {

    this.isLoading = this.courseService.isLoading$

    this.title = this.clase_selected.name
    this.description = this.clase_selected.description
    this.FILES_CLASE = this.clase_selected.files
    this.link_video_clase = this.clase_selected.vimeo_id
    this.state = this.clase_selected.state

  }

  processFile($event:any){

    for(const file of $event.target.files){
      this.FILES.push(file)
    }

    console.log(this.FILES);

  }

  public onChange(event:any){
    this.description = event.editor.getData();

  }
  save(){
    let data ={
      name:this.title,
      description: this.description,
      state: this.state
    }

    this.courseService.updateClase(data,this.clase_selected.id).subscribe((resp:any)=>{
      this.toaster.open({text:"Se ha guardado los cambios",caption:"Exitoso!!" ,type:"success"})
      this.modal.close();
      this.ClaseE.emit(resp.clase)
    })
  }

  uploadVideo(){
    let formData = new FormData()
    formData.append("video",this.video_curso)
    this.isUploadVideo = true
    this.courseService.uploadVideoClase(formData,this.clase_selected.id).subscribe((resp:any)=>{

      this.isUploadVideo = false
      console.log(resp);
      this.link_video_clase =resp.link_video
    })
  }

  urlVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_clase);
  }
  processVideo($event:any){

    if ($event.target.files[0].type.indexOf("video") < 0) {
      this.toaster.open({text:'Solo se acepta videos',caption:'Mensaje de validacion',type:'danger'})
      return;
    }
    this.video_curso = $event.target.files[0]
  }

  deleteFile(FILE:any){
      const modalref = this.modalService.open(ClasesFileDeleteComponent,{centered:true,size:"sm"})
      modalref.componentInstance.file_selected = FILE

      modalref.componentInstance.FileD.subscribe((resp: any) => {
        let INDEX = this.FILES_CLASE.findIndex((item:any)=>item.id == FILE.id)
        this.FILES_CLASE.splice(INDEX,1)
      })
  }

  uploadFile(){
    if (this.FILES.length == 0) {
      this.toaster.open({text:'Necesitas subir un recurso a la clase',caption:'Mensaje de validacion',type:'danger'})
      return;
    }
    let formData = new FormData()
    formData.append('course_clase_id', this.clase_selected.id)
    this.FILES.forEach((file:any,index:number)=>{
      formData.append("files["+index+"]",file)

    })
    this.isUploadFiles = true
    this.courseService.registerClaseFile(formData).subscribe((resp:any)=>{

      this.isUploadFiles = false
      console.log(resp);
      this.modal.close()
      this.ClaseE.emit(resp.clase)


    })
  }
}
