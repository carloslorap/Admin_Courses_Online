import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';

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
  constructor(public courseService:CourseService) { }

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

  deleteCourse(item:any){}
}
