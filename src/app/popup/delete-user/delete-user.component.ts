import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PostDetailService, UsersService } from '../../services/index';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private service: UsersService,
    private postService: PostDetailService,
    private toastr: ToastrService
  ) { }
  isReply = false;
  data: any;
  isPost = false;
  title = 'POPUP.DELETE_USER'
  ngOnInit(): void {
  }
  onDelete() {
    if (this.isPost) {
      this.postService.deletePost(this.data.postId).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res)
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
        }
      })
      return;
    }
    this.service.deleteUser(this.data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.activeModal.close(res)
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
