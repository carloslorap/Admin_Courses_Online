import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserService } from '../service/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {


  usuarios :any =[]
  isLoading :any = null

search:any = null
state :any = null

  constructor(public modalService:NgbModal,public userService:UserService) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$
    this.listUser()
  }

  openModalCreateUser(){
    const modalRef = this.modalService.open(UserAddComponent,{centered:true,size:'md'})

    modalRef.componentInstance.UserC.subscribe((User:any)=>{
      console.log(User);
      this.usuarios.unshift(User);
    })

  }

  editUser(user:any){
    const modalRef = this.modalService.open(UserEditComponent,{centered:true,size:'md'})
    modalRef.componentInstance.user =user

    modalRef.componentInstance.UserE.subscribe((User:any)=>{
      console.log(User);
      let INDEX = this.usuarios.findIndex((item:any) => item.id == User.id)
      this.usuarios[INDEX] = User
    })
  }

  deleteUser(user:any){
    const modalRef = this.modalService.open(UserDeleteComponent,{centered:true,size:'md'})
    modalRef.componentInstance.user =user

    modalRef.componentInstance.UserD.subscribe((resp:any)=>{
      let INDEX = this.usuarios.findIndex((item:any) => item.id == user.id)
      this.usuarios.splice(INDEX,1)
    })
  }

  listUser(){
    this.userService.listUsers(this.search,this.state).subscribe((resp:any)=>{
      this.usuarios = resp.users.data;
      console.log(this.usuarios);

    })
  }

}
