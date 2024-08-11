import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
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
  public idioma :any = null
  state: any = 1

  courses_id :any
  course_selected:any = null

  isUploadVideo :boolean = false
  video_curso:any = null
  link_video_course:any = null


  constructor(public courseService:CourseService,public toaster:Toaster,public activedRoute:ActivatedRoute,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$
    this.courseService.listConfig().subscribe((resp:any)=>{

      this.categories = resp.categories
      this.subcategories = resp.subcategories
      this.instructores = resp.instructores
      this.showCourse(this.courses_id)
    })

    this.activedRoute.params.subscribe((resp:any)=>{
      this.courses_id = resp.id

    })
  }

  showCourse(course_id:any){
    this.courseService.showCourse(course_id).subscribe((resp:any)=>{
      console.log(resp);

      this.course_selected = resp.course

      this.title= this.course_selected.title
      this.subtitle =this.course_selected.subtitle
      this.precio_usd =this.course_selected.precio_usd
      this.precio_pen =this.course_selected.precio_pen
      this.categorie_id = this.course_selected.categorie_id
      this.selectCategorie({target:{value:this.categorie_id}})
      this.sub_categorie_id = this.course_selected.sub_categorie_id
      this.description = this.course_selected.description
      this.level = this.course_selected.level
      this.idioma = this.course_selected.idioma
      this.user_id = this.course_selected.user_id
      //this.file_portada = this.course_selected.file_portada
      this.requirements =this.course_selected.requirements
      this.what_is_fors =this.course_selected.who_is_it_for
      this.imagen_previsualiza = this.course_selected.imagen
      this.state = this.course_selected.state


     if (this.course_selected.vimeo_id) {
      const vimeoId = this.course_selected.vimeo_id;
      const fullUrl = `https://player.vimeo.com/video/${vimeoId}`;
      this.link_video_course = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
     }

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

    if (this.file_portada) {
      formData.append("portada",this.file_portada)
    }
    formData.append("requirements",this.requirements)
    formData.append("who_is_it_for",this.what_is_fors)
    formData.append("state",this.state)

    this.courseService.updateCourses(formData,this.courses_id).subscribe((resp:any)=>{
      if (resp.message == 403) {
        this.toaster.open({text:resp.message_text,caption:'Mensaje de validacion',type:'danger'})
        return
      }else{
        this.toaster.open({text:'El curso se ha actualizado',caption:'Exitoso!',type:'success'})

        // this.title =""
        // this.subtitle =""
        // this.precio_usd =0
        // this.precio_pen =0
        // this.categorie_id =null
        // this.sub_categorie_id =null
        // this.description =null
        // this.level =null
        // this.idioma =null
        // this.user_id =null
        // this.file_portada =null
        // this.requirements =[]
        // this.what_is_fors =[]
        // this.imagen_previsualiza =null

        return
      }

    })
  }

  uploadVideo(){
    let formData = new FormData()
    formData.append("video",this.video_curso)
    this.isUploadVideo = true
    this.courseService.uploadVideo(formData,this.courses_id).subscribe((resp:any)=>{

      this.isUploadVideo = false
      console.log(resp);
      this.link_video_course =resp.link_video
    })
  }
  processVideo($event:any){

    if ($event.target.files[0].type.indexOf("video") < 0) {
      this.toaster.open({text:'Solo se acepta videos',caption:'Mensaje de validacion',type:'danger'})
      return;
    }
    this.video_curso = $event.target.files[0]
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
