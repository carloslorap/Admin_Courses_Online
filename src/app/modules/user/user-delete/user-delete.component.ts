import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {
  @Input() user:any

  @Output() UserD:EventEmitter<any> = new EventEmitter();

  isLoading :any
  constructor(
    public userService: UserService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
  }

  delete(){
    this.userService.deleteUser(this.user.id).subscribe((resp:any)=>{
      this.UserD.emit("")
    this.modal.dismiss()
    })
  }

}
