import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { CKEditor4 } from 'ckeditor4-angular';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {


  subcategories:any =[];
  subcategories_back:any = [];
  categories:any = [];
  instructores :any = []
  file_portada:any = null
  imagen_previsualiza:any = null
  isLoading:any

  text_requerimients:any = null
  requirements:any = []
  text_what_is_for:any = null
  what_is_fors:any = []

  title:string =''
  subtitle:string =''
  precio_usd :number = 0
  precio_pen:number = 0
  description:any =null
  categorie_id:any =null
  sub_categorie_id :any = null
  user_id :any = null
  level :any = null
  idioma :any = null

  constructor(public courseService:CourseService,public toaster:Toaster) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$
    this.courseService.listConfig().subscribe((resp:any)=>{
      console.log(resp);
      this.categories = resp.categories
      this.subcategories = resp.subcategories
      this.instructores = resp.instructores
    })
  }


  public onChange(event:any){
    this.description = event.editor.getData();

  }

  save(){
    let formData = new FormData()
    formData.append("title",this.title)
    formData.append("subtitle",this.subtitle)
    formData.append("precio_usd",this.precio_usd+"")
    formData.append("precio_pen",this.precio_pen+"")
    formData.append("categorie_id",this.categorie_id)
    formData.append("sub_categorie_id",this.sub_categorie_id)
    formData.append("description",this.description)
    formData.append("level",this.level)
    formData.append("idioma",this.idioma)
    formData.append("user_id",this.user_id)
    formData.append("portada",this.file_portada)
    formData.append("requirements",this.requirements)
    formData.append("who_is_it_for",this.what_is_fors)

    this.courseService.registerCourses(formData).subscribe((resp:any)=>{
      if (resp.message == 403) {
        this.toaster.open({text:resp.message_text,caption:'Mensaje de validacion',type:'danger'})
        return
      }else{
        this.toaster.open({text:'El curso se ha creado',caption:'Exitoso!',type:'success'})

        this.title =""
        this.subtitle =""
        this.precio_usd =0
        this.precio_pen =0
        this.categorie_id =null
        this.sub_categorie_id =null
        this.description =null
        this.level =null
        this.idioma =null
        this.user_id =null
        this.file_portada =null
        this.requirements =[]
        this.what_is_fors =[]
        this.imagen_previsualiza =null

        return
      }

    })
  }
  processFile($event:any){
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open({text:'Solo se acepta imagenes',caption:'Mensaje de validacion',type:'danger'})
      return;
    }
    this.file_portada = $event.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(this.file_portada)
    reader.onloadend=()=>this.imagen_previsualiza= reader.result
    this.courseService.isLoadingSubject.next(true)

    setTimeout(()=>{
      this.courseService.isLoadingSubject.next(false)
    },50)
  }

  selectCategorie(event:any){
  let VALUE = event.target.value
    this.subcategories_back = this.subcategories.filter((item:any) => item.categorie_id == VALUE)
  }

  addRequeriments(){
    if (!this.text_requerimients) {
      this.toaster.open({text:"Necesitas ingresar un requerimiento",caption:"VALIDACION",type:"danger"})
      return
    }
    this.requirements.push(this.text_requerimients)
    this.text_requerimients = null
  }

  removeRequeriments(i:number){
    this.requirements.splice(i,1)
    this.text_requerimients = null
  }

  addWhatIsFor(){
    if (!this.text_what_is_for) {
      this.toaster.open({text:"Necesitas ingresar una persona dirigida",caption:"VALIDACION",type:"danger"})
      return
    }
    this.what_is_fors.push(this.text_what_is_for)
    this.text_what_is_for = null
  }

  removeWhatIsFor(i:number){
    this.what_is_fors.splice(i,1)
    this.text_what_is_for = null
  }
}

