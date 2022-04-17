import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../../services/index';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class DeleteCommentComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private service: CommentService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }
  isReply = false;
  commentId = '';
  title = 'POPUP.DELETE_COMMENT'
  ngOnInit(): void {
    if (this.isReply) {
      this.title = 'POPUP.DELETE_REPLY'
    }
  }

  onDelete() {
    this.spinner.show();
    if (this.isReply) {
      this.service.deleteReply(this.commentId).subscribe({
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
    } else {
      this.service.deleteComment(this.commentId).subscribe({
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
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
