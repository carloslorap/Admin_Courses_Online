import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [BuilderComponent, DemoComponent],
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuilderComponent,
      },
    ]),
    CKEditorModule,
  ],
})
export class BuilderModule {}
