import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CouponService } from '../service/coupon.service';
import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coupon-delete',
  templateUrl: './coupon-delete.component.html',
  styleUrls: ['./coupon-delete.component.scss']
})
export class CouponDeleteComponent implements OnInit {


  @Input() coupon:any

  @Output() CouponD:EventEmitter<any> = new EventEmitter();

  isLoading :any
  constructor(
    public couponService: CouponService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.couponService.isLoading$;
  }

  delete(){
    this.couponService.deleteCoupon(this.coupon.id).subscribe((resp:any)=>{
      this.CouponD.emit("")
    this.modal.dismiss()
    })
  }

}
