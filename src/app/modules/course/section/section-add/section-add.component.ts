import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionEditComponent } from '../section-edit/section-edit.component';
import { SectionDeleteComponent } from '../section-delete/section-delete.component';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit {

  course_id :any
  isLoading :any
  title  :any

  SECTIONS:any =[]

  constructor(
    public courseService:CourseService,
    public activedrouter:ActivatedRoute,
    public toaster:Toaster,
    public modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$
    this.activedrouter.params.subscribe((resp:any)=>{
      this.course_id = resp.id

    })

    this.courseService.listSections(this.course_id).subscribe((resp:any)=>{
      console.log(resp);
      this.SECTIONS = resp.sections

    })
  }

  save(){
    if (!this.title) {
      this.toaster.open({text:'Completa todos los campos',caption:'Mensaje de validacion',type:'danger'})
      return;
    }
    let data={
      name:this.title,
      course_id :this.course_id,
      state:1
    }
    this.courseService.registerSection(data).subscribe((resp:any)=>{
      this.title = null
      this.SECTIONS.push(resp.section)
      this.toaster.open({text:'La seccion se ha registrado',caption:'Exitoso',type:'success'})
    })
  }

  editSection(item:any){
    const modalref = this.modalService.open(SectionEditComponent,{centered:true,size:'md'})
    modalref.componentInstance.section_selected =item
    modalref.componentInstance.SectionE.subscribe((newSection:any)=>{
    let INDEX = this.SECTIONS.findIndex(((subitem:any) => subitem.id === newSection.id))

    if (INDEX != -1) {
        this.SECTIONS[INDEX] = newSection
    }
    })
  }

  deleteSection(item:any){
    const modalref = this.modalService.open(SectionDeleteComponent,{centered:true,size:'md'})
    modalref.componentInstance.section_selected =item
    modalref.componentInstance.SectionD.subscribe((newSection:any)=>{
    let INDEX = this.SECTIONS.findIndex(((subitem:any) => subitem.id === item.id))

    if (INDEX != -1) {
        this.SECTIONS.splice(INDEX, 1)
    }
    })
  }

}
