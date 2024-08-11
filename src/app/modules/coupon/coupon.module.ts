import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponComponent } from './coupon.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CouponAddComponent } from './coupon-add/coupon-add.component';
import { CouponEditComponent } from './coupon-edit/coupon-edit.component';
import { CouponDeleteComponent } from './coupon-delete/coupon-delete.component';
import { CouponListComponent } from './coupon-list/coupon-list.component';


@NgModule({
  declarations: [
    CouponComponent,
    CouponAddComponent,
    CouponEditComponent,
    CouponDeleteComponent,
    CouponListComponent
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,


    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ]
})
export class CouponModule { }
