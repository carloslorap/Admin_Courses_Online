import { Component, OnInit } from '@angular/core';
import { CouponService } from '../service/coupon.service';
import { Toaster } from 'ngx-toast-notifications';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.scss']
})
export class CouponEditComponent implements OnInit {

  isLoading:any
  code:any
  discount:number =0
  num_use:any =null
  type_discount:number =1
  type_count:number =1

  type_coupon:number =1
  categorie_id:any = null
  course_id:any = null
  state :number = 1

  courses:any =[]
  categories:any =[]

  categorie_selecteds:any =[]
  course_selecteds:any =[]

  coupon_id:any = null

  coupon_selected:any

  constructor(public couponService:CouponService,public toaster :Toaster,public activedrouter:ActivatedRoute) { }

  ngOnInit(): void {
      this.isLoading = this.couponService.isLoading$
      this.activedrouter.params.subscribe((resp:any)=>{
       this.coupon_id = resp.id

      })
    this.couponService.listConfig().subscribe((resp:any)=>{
      this.courses = resp.courses
      this.categories = resp.categories

      this.showCoupon()

    })
  }

   showCoupon(){
    this.couponService.showCoupon(this.coupon_id).subscribe((resp:any)=>{
      console.log(resp);
      this.coupon_selected = resp.coupon

      this.code =this.coupon_selected.code
      this.discount =this.coupon_selected.discount
      this.num_use =this.coupon_selected.num_use
      this.type_discount =this.coupon_selected.type_discount
      this.type_count =this.coupon_selected.type_count
      this.type_coupon =this.coupon_selected.type_coupon
      this.state =this.coupon_selected.state
      if (this.type_coupon == 1) {
        this.course_selecteds = this.coupon_selected.courses
      }
      if (this.type_coupon == 2) {
        this.categorie_selecteds= this.coupon_selected.categories
      }
    })
   }


save(){
  if (!this.code || !this.discount) {
    this.toaster.open({text:"Necesitas ingresar todos los campos",caption:"Validacion",type:"danger"})
    return
  }

  if (this.type_count == 2 && !this.num_use) {
    this.toaster.open({text:"Necesitas ingresar un numero de uso ilimitado",caption:"Validacion",type:"danger"})
    return
  }

  if (this.type_coupon == 1 && this.course_selecteds.length == 0) {
    this.toaster.open({text:"Necesitas ingresar un curso",caption:"Validacion",type:"danger"})
    return
  }
  if (this.type_coupon == 2 && this.categorie_selecteds.length == 0) {
    this.toaster.open({text:"Necesitas ingresar una categoria",caption:"Validacion",type:"danger"})
    return
  }
  let data ={
    code:this.code,
    type_discount:this.type_discount,
    discount:this.discount,
    num_use :this.num_use,
    type_count:this.type_count,
    type_coupon :this.type_coupon,

    course_selected:this.course_selecteds,
    categorie_selected:this.categorie_selecteds,
    state : this.state

  }
  this.couponService.updateCoupon(data,this.coupon_id).subscribe((resp:any)=>{
    console.log(resp);
    if (resp.message == 403) {
      this.toaster.open({text:resp.message_text,caption:"Validacion",type:"danger"})
    }else{
      this.toaster.open({text:"El cupon se ha actualizado",caption:"Exitoso!!",type:"success"})


    }
  })
}

selectedTypeDiscount(value:any){
  this.type_discount = value
}

selectedTypeCount(value:any){
this.type_count = value
}

selectedTypeCoupon(value:any){
  this.type_coupon = value
}

addCategorieSelected(){
  let VALID = this.categorie_selecteds.findIndex((categorie:any)=> categorie.id == this.categorie_id)
  if (VALID == -1) {

    let INDEX = this.categories.findIndex((i:any)=> i.id == this.categorie_id)
    if (INDEX != -1) {
        this.categorie_selecteds.push(this.categories[INDEX])
    }

  }else{
    this.toaster.open({text:"No puedes volver a elegir la misma categoria",caption:"Validacion",type:"danger"})
  }

}

addCourseSelected(){
  let VALID = this.course_selecteds.findIndex((course:any)=> course.id == this.course_id)

  if (VALID == -1) {

    let INDEX = this.courses.findIndex((i:any)=> i.id == this.course_id)
    if (INDEX != -1) {
        this.course_selecteds.push(this.courses[INDEX])
    }

  }else{
    this.toaster.open({text:"No puedes volver a elegir el mismo curso",caption:"Validacion",type:"danger"})
  }
}

removeCategoire(item:number){
  this.categorie_selecteds.splice(item,1)
}

removeCourse(item:number){
  this.course_selecteds.splice(item,1)
}
}
