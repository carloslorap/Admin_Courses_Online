import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';

const routes: Routes = [{
  path:'',
  component:CategoriesComponent,
  children:[
    {path:'list',component:CategorieListComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
