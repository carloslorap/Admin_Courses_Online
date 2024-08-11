import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss']
})
export class SectionEditComponent implements OnInit {

  @Input() section_selected:any
  @Output() SectionE:EventEmitter<any> = new EventEmitter();

  title:any
  state:any = 1
  isLoading: any = null;
  constructor(public modal :NgbActiveModal,public courseService:CourseService) { }

  ngOnInit(): void {
    this.title = this.section_selected.name
    this.state = this.section_selected.state
    console.log(this.section_selected);

  }


  store(){
    let data={
      name:this.title,
      starte:this.state
    }
    this.courseService.updateSection(data,this.section_selected.id).subscribe((resp:any)=>{
      console.log(resp);
      this.SectionE.emit(resp.section)
      this.modal.close()
    })
  }
}
