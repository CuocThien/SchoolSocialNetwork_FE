import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService, PostDetailService, UsersService } from '../../services/index';

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
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private accountService: AccountService
  ) { }
  isReply = false;
  data: any;
  isPost = false;
  isOutGroup = false;
  isAccount = false;
  isRecoveryAccount = false;
  title = 'POPUP.DELETE_USER'
  ngOnInit(): void {
    if (this.isPost)
      this.title = 'POPUP.DELETE_POST'
    if (this.isOutGroup)
      this.title = 'POPUP.OUT_GROUP'
    if (this.isAccount)
      this.title = 'POPUP.DELETE_ACCOUNT'
    if (this.isRecoveryAccount)
      this.title = 'POPUP.RECOVERY_ACCOUNT'
  }
  onDelete() {
    this.spinner.show();;
    this.spinner.hide();
    if (this.isPost) {
      this.postService.deletePost(this.data.postId).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res);
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        }
      })
      return;
    }
    if (this.isAccount) {
      this.accountService.deleteAccount([{ _id: this.data._id }]).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res);
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        }
      })
      return;
    }
    if (this.isRecoveryAccount) {
      this.accountService.recoveryAccount({ _id: this.data._id }).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res);
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        }
      })
      return;
    }
    this.service.deleteUser(this.data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.activeModal.close(res);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
