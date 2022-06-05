import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }
  comment: any;
  isReply = false;
  commentId = '';
  content = '';
  title = 'POPUP.EDIT_COMMENT';

  notiFill = ''

  ngOnInit(): void {
    this.translate.get([
      'NOTIFICATION.EMPTY_INPUT',
    ])
      .subscribe(translations => {
        this.notiFill = translations['NOTIFICATION.EMPTY_INPUT'];
      });
    this.commentId = (this.isReply) ? this.comment.replyId : this.comment.commentId;
    this.content = this.comment.content;
    if (this.isReply) {
      this.title = 'POPUP.EDIT_REPLY';
    }
  }

  onEdit() {
    if (this.content.trim() == '') {
      this.toastr.error(this.notiFill);
      return;
    }
    this.spinner.show();
    if (this.isReply) {
      const validData = {
        replyId: this.commentId,
        content: this.content
      }
      this.service.updateReply(validData).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res.data);
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
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
