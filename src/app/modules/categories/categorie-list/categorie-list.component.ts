import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from '../service/categorie.service';
import { CategorieAddComponent } from '../categorie-add/categorie-add.component';
import { CategorieEditComponent } from '../categorie-edit/categorie-edit.component';
import { CategorieDeleteComponent } from '../categorie-delete/categorie-delete.component';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss'],
})
export class CategorieListComponent implements OnInit {
  categories: any = [];
  isLoading: any = null;

  search: any = null;
  state: any = null;

  constructor(public modalService: NgbModal, public categorieService: CategorieService) {}

  ngOnInit(): void {
    this.isLoading = this.categorieService.isLoading$;
    this.listCategorie();
  }

  openModalCreateCategorie() {
    const modalRef = this.modalService.open(CategorieAddComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.categories = this.categories.filter((categori:any)=>!categori.categorie_id);
    modalRef.componentInstance.CategorieC.subscribe((Categorie: any) => {
      console.log(Categorie);
      this.categories.unshift(Categorie);
    });
  }

  editCategorie(categorie: any) {
    const modalRef = this.modalService.open(CategorieEditComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.categorie = categorie;
    modalRef.componentInstance.categories = this.categories.filter((categori:any)=>!categori.categorie_id);
    modalRef.componentInstance.CategorieE.subscribe((Categorie: any) => {
      console.log(Categorie);
      let INDEX = this.categories.findIndex((item: any) => item.id == Categorie.id);
      this.categories[INDEX] = Categorie;
    });
  }

  deleteCategorie(categorie: any) {
    const modalRef = this.modalService.open(CategorieDeleteComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.categorie = categorie;

    modalRef.componentInstance.CategorieD.subscribe((resp: any) => {
      let INDEX = this.categories.findIndex((item: any) => item.id == categorie.id);
      this.categories.splice(INDEX, 1);
    });
  }

  listCategorie() {
    this.categorieService
      .listCategories(this.search, this.state)
      .subscribe((resp: any) => {
        this.categories = resp.categories.data;
        console.log(this.categories);
      });
  }
}
