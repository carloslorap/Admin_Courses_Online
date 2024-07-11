import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() user:any

  @Output() UserE:EventEmitter<any> = new EventEmitter();

  name: any = null;
  surname: any = null;
  email: any = null;
  password: any = null;
  confirmation_password: any = null;

  is_instructor : any = null;
  profesion: any = null;
  description: any = null;

  state:any = 1

  imagen_previsualiza:any = "./assets/media/avatars/300-6.jpg";
  file_avatar :any = null


  isLoading :any
  constructor(
    public userService: UserService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;

    this.name =this.user.name
    this.surname=this.user.surname
    this.email=this.user.email
    this.state=this.user.state
    this.imagen_previsualiza=this.user.avatar
    this.is_instructor=this.user.is_instructor
    this.profesion =this.user.profesion
    this.description=this.user.description
  }

  processAvatar($event:any){
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open({text:'Solo se acepta imagenes',caption:'Mensaje de validacion',type:'danger'})
      return;
    }
    this.file_avatar = $event.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(this.file_avatar)
    reader.onloadend=()=>this.imagen_previsualiza= reader.result
  }


  store(){

    if (!this.name || !this.surname || !this.email) {
      this.toaster.open({text:'Necesitas llenar todos los campos',caption:'Validacion',type:'danger'})
      return
    }

    if (this.password) {
      if (this.password != this.confirmation_password) {
        this.toaster.open({text:'Las contraseñas no coincide',caption:'Validacion',type:'danger'})
      }
    }
    let formData = new FormData();

    formData.append("name",this.name)
    formData.append("surname",this.surname)
    formData.append("email",this.email)
    if (this.is_instructor) {
      formData.append("is_instructor",this.is_instructor ? "1" : "0")
      formData.append("profesion",this.profesion)
      formData.append("description",this.description)
    }
    if (this.password) {
      formData.append("password",this.password)
    }
    formData.append("state",this.state)
    if (this.file_avatar) {
      formData.append("image",this.file_avatar)
    }

    this.userService.updated(formData,this.user.id).subscribe((resp:any) =>{
      console.log(resp);
      this.UserE.emit(resp.user)
      this.toaster.open({text:'Usuario actualizado correctamente',caption:'Validacion',type:'success'})
      this.modal.close();

    })
  }

  isInstructor(){
    this.is_instructor =!this.is_instructor;

  }

}
