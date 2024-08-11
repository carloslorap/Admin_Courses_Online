import { Component, OnInit } from '@angular/core';
import { CouponService } from '../service/coupon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponDeleteComponent } from '../coupon-delete/coupon-delete.component';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {

  isLoading:any
  COUPONS :any = []

  search: any = null;
  state: any = 0;

  constructor(public couponService:CouponService,public modalService: NgbModal,) { }

  ngOnInit(): void {
    this.listCoupon()
  }

  listCoupon(){
    this.isLoading = this.couponService.isLoading$
    this.couponService.listCoupon(this.search,this.state).subscribe((resp:any)=>{
      console.log(resp.coupons);
      this.COUPONS = resp.coupons.data;

    })
  }



  deleteCoupon(item:any){
    const modalRef = this.modalService.open(CouponDeleteComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.coupon = item;

    modalRef.componentInstance.CouponD.subscribe((resp: any) => {
      let INDEX = this.COUPONS.findIndex((item: any) => item.id == item.id);
      this.COUPONS.splice(INDEX, 1);
    });
  }
}
