import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorieService } from '../service/categorie.service';
import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorie-delete',
  templateUrl: './categorie-delete.component.html',
  styleUrls: ['./categorie-delete.component.scss']
})
export class CategorieDeleteComponent implements OnInit {

  @Input() categorie:any

  @Output() CategorieD:EventEmitter<any> = new EventEmitter();

  isLoading :any
  constructor(
    public categorieService: CategorieService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.categorieService.isLoading$;
  }

  delete(){
    this.categorieService.deleteCategorie(this.categorie.id).subscribe((resp:any)=>{
      this.CategorieD.emit("")
    this.modal.dismiss()
    })
  }


}
