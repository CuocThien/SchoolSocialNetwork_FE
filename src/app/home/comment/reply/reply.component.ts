import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChangeCommentComponent } from 'src/app/popup/change-comment/change-comment.component';
import { DeleteCommentComponent } from 'src/app/popup/delete-comment/delete-comment.component';
import { CommentService } from '../../../services/index';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['../../../../assets/sass/main.scss']
})
export class ReplyComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private service: CommentService,
    private toastr: ToastrService
  ) { }

  myAvatar: any;
  content = '';
  userId = '';
  isAdmin = false;
  @Input() isLoadReply: number;
  maxPage = 1;
  page = 1;
  @Input() isOpenCreateReply = '';
  @Input() commentId = '';
  listReply = [];
  private modalRef: NgbModalRef;

  ngOnInit(): void {
    this.myAvatar = JSON.parse(localStorage.getItem('profile') || '').avatar;
    this.userId = JSON.parse(localStorage.getItem('profile') || '')._id;
    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    }
  }
  onReply() {
    const validData = {
      commentId: this.commentId,
      content: this.content
    }
    this.service.postReply(validData).subscribe({
      next: ((res: any) => {
        this.toastr.success(res.msg);
        this.listReply.push(res.data);
        this.content = ''
        this.isOpenCreateReply = ''
      }),
      error: ((err: any) => {
        this.toastr.error(err.error.msg)
      })
    })
  }
  ngOnChanges(changes: any) {
    this.isOpenCreateReply = changes.isOpenCreateReply.currentValue
  }
  editReply(event: any, index: any) {
    this.modalRef = this.modalService.open(ChangeCommentComponent, {
      backdrop: 'static',
      centered: true
    })
    this.modalRef.componentInstance.isReply = true;
    this.modalRef.componentInstance.comment = event;
    this.modalRef.result.then(
      (res: any) => {
        this.listReply[index] = res;
      }).catch(() => { })
  }
  deleteReply(event: any, index: any) {
    this.modalRef = this.modalService.open(DeleteCommentComponent, {
      backdrop: 'static',
      centered: true,
    })
    this.modalRef.componentInstance.commentId = event;
    this.modalRef.componentInstance.isReply = true;
    this.modalRef.result.then(() => {
      this.listReply.splice(index, 1)
    }).catch(() => { });
  }
  _getReply() {
    this.isLoadReply = 0;
    this.service.getReply({ commentId: this.commentId, page: this.page }).subscribe({
      next: ((res: any) => {
        const data = res.data.result || [];
        this.listReply = this.listReply.length < 3 ? data : [...data, ...this.listReply];
        this.maxPage = res.data.countReply ? Math.ceil(res.data.countReply / 3) : 1;
      }),
      error: ((err: any) => {
      })
    })
  }
  goToPage() {
    this.page++;
    this._getReply()
  }
}
