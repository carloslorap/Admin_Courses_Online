import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { CourseDeleteComponent } from '../course-delete/course-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {


  courses:any =[]
  isLoading :any=null

  search:any = null
  state :any = null
  constructor(public courseService:CourseService,public modalService:NgbModal) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.listCourse()
  }


  listCourse(){
    this.courseService.listCourses(this.search,this.state).subscribe((resp:any)=>{
      console.log(resp);
      this.courses = resp.courses.data;

    })
  }

  deleteCourse(item:any){
    const modalRef = this.modalService.open(CourseDeleteComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.course  = item;

    modalRef.componentInstance.CourseD.subscribe((resp: any) => {
      let INDEX = this.courses.findIndex((item: any) => item.id == item.id);
      this.courses.splice(INDEX, 1);
    });

  }
}
