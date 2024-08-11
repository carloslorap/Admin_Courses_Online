import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../service/course.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-section-delete',
  templateUrl: './section-delete.component.html',
  styleUrls: ['./section-delete.component.scss']
})
export class SectionDeleteComponent implements OnInit {
  @Input() section_selected:any
  @Output() SectionD:EventEmitter<any> = new EventEmitter();
  isLoading: any = null;
  constructor(public modal :NgbActiveModal,public courseService:CourseService,public toaster:Toaster,) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
  }


  delete(){
    this.courseService.deleteSection(this.section_selected.id).subscribe((resp:any)=>{

      if (resp.message == 403) {
        this.toaster.open({text:resp.message_text,caption:"Validacion",type:"danger"})
        return
      }


    this.SectionD.emit("")
    this.modal.dismiss()
    })
  }
}
