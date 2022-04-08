import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/index';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private service: UsersService,
    private toastr: ToastrService
  ) { }
  isReply = false;
  data: any;
  title = 'POPUP.DELETE_USER'
  ngOnInit(): void {
    // if (this.isReply) {
    //   this.title = 'POPUP.DELETE_REPLY'
    // }
  }
  onDelete() {
    // if (this.isReply) {
    this.service.deleteUser(this.data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.activeModal.close(res)
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
    // } else {
    //   this.service.deleteComment(this.commentId).subscribe({
    //     next: (res: any) => {
    //       this.toastr.success(res.msg);
    //       this.activeModal.close(res);
    //     },
    //     error: (err: any) => {
    //       this.toastr.error(err.error.msg)
    //     }
    //   })
    // }
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
