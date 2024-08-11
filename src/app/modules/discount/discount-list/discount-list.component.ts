import { Component, OnInit } from '@angular/core';
import { DiscountDeleteComponent } from '../discount-delete/discount-delete.component';
import { DiscountService } from '../service/discount.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {

  isLoading:any
  DISCOUNTS :any = []

  search: any = null;
  state: any = 0;

  constructor(public dissountService:DiscountService,public modalService: NgbModal,) { }

  ngOnInit(): void {
    this.listDiscount()
  }

  listDiscount(){
    this.isLoading = this.dissountService.isLoading$
    this.dissountService.listDiscount(this.search,this.state).subscribe((resp:any)=>{
      console.log(resp.discounts);
      this.DISCOUNTS = resp.discounts.data;

    })
  }



  deleteDiscount(item:any){
    const modalRef = this.modalService.open(DiscountDeleteComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.discount = item;

    modalRef.componentInstance.DiscountD.subscribe((resp: any) => {
      let INDEX = this.DISCOUNTS.findIndex((item: any) => item.id == item.id);
      this.DISCOUNTS.splice(INDEX, 1);
    });
  }

}
