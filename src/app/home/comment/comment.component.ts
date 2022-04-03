import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChangeCommentComponent } from 'src/app/popup/change-comment/change-comment.component';
import { DeleteCommentComponent } from 'src/app/popup/delete-comment/delete-comment.component';
import { CommentService } from '../../services/index';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class CommentComponent implements OnInit {

  @Input() postId!: any;
  listCmt: any;
  countCmt: any;
  commentContent = '';
  userId = '';
  isAdmin = false;
  myAvatar: any;
  replyCmtId = '';
  private modalRef: NgbModalRef | undefined;

  constructor(
    private modalService: NgbModal,
    private service: CommentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('profile') || '')._id;
    this.myAvatar = JSON.parse(localStorage.getItem('profile') || '').avatar;
    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    }
    this._getComment();
  }
  turnOnReply(event: any) {
    this.replyCmtId = event;
  }
  resPostCmt: any;
  postComment() {
    if (this.commentContent == '') {
      this.toastr.error('Please input comment!!!')
      return;
    }
    const validData = {
      content: this.commentContent,
      postId: this.postId
    }
    this.service.postComment(validData).subscribe({
      next: ((res: any) => {
        this.listCmt.push(res.data)
        this.toastr.success(res.msg)
        this.commentContent = ''
      }),
      error: ((err: any) => {
        this.toastr.error(err.error.msg)
      })
    })
  }

  deleteCmt(event: any, index: any) {
    this.modalRef = this.modalService.open(DeleteCommentComponent, {
      backdrop: 'static',
      centered: true,
    })
    this.modalRef.componentInstance.commentId = event;
    this.modalRef.result.then(() => {
      this.listCmt.splice(index, 1)
    }).catch(() => { });
  }

  editComment(event: any, index: any) {
    this.modalRef = this.modalService.open(ChangeCommentComponent, {
      backdrop: 'static',
      centered: true,
    })
    this.modalRef.componentInstance.comment = event;
    this.modalRef.result.then((res: any) => {
      this.listCmt[index] = res;
    }).catch(() => { });
  }

  _getComment() {
    this.service.getComment(this.postId).subscribe({
      next: ((res: any) => {
        this.listCmt = res.data.result || [];
        this.countCmt = res.data.countCmt;
      }),
      error: ((err: any) => {
        this.toastr.error(err.error.msg)
      })
    })
  }

}
