import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorieService } from '../service/categorie.service';
import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorie-add',
  templateUrl: './categorie-add.component.html',
  styleUrls: ['./categorie-add.component.scss']
})
export class CategorieAddComponent implements OnInit {
  @Output() CategorieC:EventEmitter<any> = new EventEmitter();
  @Input() categories:any = null
  name: any = null;
  categorie_id:any = null
  selected_option: any = 1;
  imagen_previsualiza:any = "./assets/media/avatars/300-6.jpg";
  file_portada :any = null


  isLoading :any
  constructor(
    public categorieService: CategorieService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.isLoading = this.categorieService.isLoading$
  }

  processAvatar($event:any){
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open({text:'Solo se acepta imagenes',caption:'Mensaje de validacion',type:'danger'})
      return;
    }
    this.file_portada = $event.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(this.file_portada)
    reader.onloadend=()=>this.imagen_previsualiza= reader.result
  }


  store(){

    if (this.selected_option == 1) {
      if (!this.name || !this.file_portada) {
        this.toaster.open({text:'Necesitas llenar todos los campos',caption:'Validacion',type:'danger'})
        return
      }
    }

    if (this.selected_option == 2) {
      if (!this.name || !this.categorie_id) {
        this.toaster.open({text:'Necesitas llenar todos los campos',caption:'Validacion',type:'danger'})
        return
      }
    }

    let formData = new FormData();

    formData.append("name",this.name)
    if (this.categorie_id) {
      formData.append("categorie_id",this.categorie_id)
    }
    if (this.file_portada) {
      formData.append("portada",this.file_portada)
    }

    this.categorieService.registerCategorie(formData).subscribe((resp:any) =>{
      console.log(resp);
      this.CategorieC.emit(resp.categorie)
      this.toaster.open({text:'Categoria creado correctamente',caption:'Validacion',type:'success'})
      this.modal.close();

    })
  }

  selectedOption(value:number){
    this.selected_option = value;
  }
}
