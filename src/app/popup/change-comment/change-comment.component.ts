import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../../services/index';

@Component({
  selector: 'app-change-comment',
  templateUrl: './change-comment.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ChangeCommentComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private service: CommentService,
    private toastr: ToastrService
  ) { }
  comment: any;
  isReply = false;
  commentId = '';
  content = '';
  title = 'POPUP.EDIT_COMMENT';

  ngOnInit(): void {
    this.commentId = (this.isReply) ? this.comment.replyId : this.comment.commentId;
    this.content = this.comment.content;
    if (this.isReply) {
      this.title = 'POPUP.EDIT_REPLY';
    }
  }

  onEdit() {
    if (this.isReply) {
      const validData = {
        replyId: this.commentId,
        content: this.content
      }
      this.service.updateReply(validData).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res.data);
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
        }
      })
    } else {
      const validData = {
        commentId: this.commentId,
        content: this.content
      }
      this.service.updateComment(validData).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res.data);
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
        }
      })
    }
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
