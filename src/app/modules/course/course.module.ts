import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { CourseListComponent } from './course-list/course-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';
import { SectionAddComponent } from './section/section-add/section-add.component';
import { SectionEditComponent } from './section/section-edit/section-edit.component';
import { SectionDeleteComponent } from './section/section-delete/section-delete.component';
import { ClaseAddComponent } from './section/clases/clase-add/clase-add.component';
import { ClaseEditComponent } from './section/clases/clase-edit/clase-edit.component';
import { ClaseDeleteComponent } from './section/clases/clase-delete/clase-delete.component';
import { ClasesFileDeleteComponent } from './section/clases/clases-file-delete/clases-file-delete.component';


@NgModule({
  declarations: [
    CourseComponent,
    CourseAddComponent,
    CourseEditComponent,
    CourseDeleteComponent,
    CourseListComponent,
    SectionAddComponent,
    SectionEditComponent,
    SectionDeleteComponent,
    ClaseAddComponent,
    ClaseEditComponent,
    ClaseDeleteComponent,
    ClasesFileDeleteComponent,

  ],
  imports: [
    CommonModule,
    CourseRoutingModule,

    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,

    CKEditorModule
  ]
})
export class CourseModule { }
