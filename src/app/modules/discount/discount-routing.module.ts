import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountComponent } from './discount.component';
import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';
import { DiscountListComponent } from './discount-list/discount-list.component';

const routes: Routes = [{
  path:"",
  component:DiscountComponent,
  children:[
    {
      path:"registro",
      component:DiscountAddComponent
    },
    {
      path:"editar/:id",
      component:DiscountEditComponent
    },
    {
      path:"list",
      component:DiscountListComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
