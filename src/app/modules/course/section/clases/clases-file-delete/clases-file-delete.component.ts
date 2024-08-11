import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clases-file-delete',
  templateUrl: './clases-file-delete.component.html',
  styleUrls: ['./clases-file-delete.component.scss']
})
export class ClasesFileDeleteComponent implements OnInit {

  @Input() file_selected:any

  @Output() FileD:EventEmitter<any> = new EventEmitter();

  isLoading :any
  constructor(
    public courseService: CourseService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
  }

  delete(){
    this.courseService.deleteClaseFila(this.file_selected.id).subscribe((resp:any)=>{
      this.FileD.emit("")
    this.modal.dismiss()
    })
  }

}
