import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../service/discount.service';
import { Toaster } from 'ngx-toast-notifications';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.scss']
})
export class DiscountEditComponent implements OnInit {
  isLoading: any;

  discount: number = 0;
  type_discount: number = 1;
  start_date:any = null
  end_date:any = null
  discount_type: number = 1;
  type_campaing:number = 1; //1 es campaña normal y 2 s flash y 3 es banner

  categorie_id: any = null;
  state :number = 1
  course_id: any = null;

  courses: any = [];
  categories: any = [];

  categorie_selecteds: any = [];
  course_selecteds: any = [];

  discount_selected: any = null;
  discount_id: any = null;
  constructor(public discountService: DiscountService, public toaster: Toaster,public activedRouter:ActivatedRoute) {}

  ngOnInit(): void {


    this.isLoading = this.discountService.isLoading$;

    this.activedRouter.params.subscribe((resp:any)=>{
      this.discount_id = resp.id
    })
    this.discountService.listConfig().subscribe((resp: any) => {
      this.courses = resp.courses;
      this.categories = resp.categories;

      this.showDiscount()
    });

  }

  showDiscount(){
    this.discountService.showDiscount(this.discount_id).subscribe((resp:any)=>{
      console.log(resp);
      this.discount_selected = resp.discount;

      this.discount =this.discount_selected.discount
      this.start_date =this.discount_selected.start_date
      this.type_discount =this.discount_selected.type_discount
      this.type_campaing =this.discount_selected.type_campaing
      this.end_date =this.discount_selected.end_date
      this.discount_type =this.discount_selected.discount_type
      this.state =this.discount_selected.state
      if (this.discount_type == 1) {
        this.course_selecteds = this.discount_selected.courses
      }
      if (this.discount_type == 2) {
        this.categorie_selecteds= this.discount_selected.categories
      }
    })
  }


  save() {
    if (!this.discount || !this.start_date || !this.end_date) {
      this.toaster.open({
        text: 'Necesitas ingresar todos los campos',
        caption: 'Validacion',
        type: 'danger',
      });
      return;
    }



    if (this.discount_type == 1 && this.course_selecteds.length == 0) {
      this.toaster.open({
        text: 'Necesitas ingresar un curso',
        caption: 'Validacion',
        type: 'danger',
      });
      return;
    }
    if (this.discount_type == 2 && this.categorie_selecteds.length == 0) {
      this.toaster.open({
        text: 'Necesitas ingresar una categoria',
        caption: 'Validacion',
        type: 'danger',
      });
      return;
    }
    let data = {

      type_discount: this.type_discount,
      discount: this.discount,
      start_date:this.start_date,
      end_date:this.end_date,
      discount_type: this.discount_type,
      type_campaing : this.type_campaing,
      course_selected: this.course_selecteds,
      categorie_selected: this.categorie_selecteds,
      state: this.state,
    };
    this.discountService.updateDiscount(data,this.discount_id).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.toaster.open({
          text: resp.message_text,
          caption: 'Validacion',
          type: 'danger',
        });
      } else {
        this.toaster.open({
          text: 'La campaña de descuento se ha actualizado',
          caption: 'Exitoso!!',
          type: 'success',
        });


      }
    });
  }

  selectedTypeDiscount(value: any) {
    this.type_discount = value;
  }



  selectedTypeCoupon(value: any) {

    this.discount_type = value;
    this.categorie_selecteds = [];
    this.course_selecteds = [];
  }

  addCategorieSelected() {
    let VALID = this.categorie_selecteds.findIndex(
      (categorie: any) => categorie.id == this.categorie_id
    );
    if (VALID == -1) {
      let INDEX = this.categories.findIndex(
        (i: any) => i.id == this.categorie_id
      );
      if (INDEX != -1) {
        this.categorie_selecteds.push(this.categories[INDEX]);
      }
    } else {
      this.toaster.open({
        text: 'No puedes volver a elegir la misma categoria',
        caption: 'Validacion',
        type: 'danger',
      });
    }
  }

  addCourseSelected() {
    let VALID = this.course_selecteds.findIndex(
      (course: any) => course.id == this.course_id
    );

    if (VALID == -1) {
      let INDEX = this.courses.findIndex((i: any) => i.id == this.course_id);
      if (INDEX != -1) {
        this.course_selecteds.push(this.courses[INDEX]);
      }
    } else {
      this.toaster.open({
        text: 'No puedes volver a elegir el mismo curso',
        caption: 'Validacion',
        type: 'danger',
      });
    }
  }

  removeCategoire(item: number) {
    this.categorie_selecteds.splice(item, 1);
  }

  removeCourse(item: number) {
    this.course_selecteds.splice(item, 1);
  }

  selectedTypeCampaing(value:any){
    this.selectedTypeCoupon(1)
    this.type_campaing = value;
  }
}
