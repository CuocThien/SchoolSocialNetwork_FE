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
  @Input() isOpenCreateReply = '';
  @Input() commentId = '';
  listReply: any;
  private modalRef: NgbModalRef | undefined;

  ngOnInit(): void {
    this.myAvatar = JSON.parse(localStorage.getItem('profile') || '').avatar;
    this.userId = JSON.parse(localStorage.getItem('profile') || '')._id;
    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    }
    this.service.getReply(this.commentId).subscribe(
      (res: any) => {
        this.listReply = res.data.result || [];
      },
      (err: any) => {
        this.toastr.error(err.error.msg)
      }
    )

  }
  onReply() {
    const validData = {
      commentId: this.commentId,
      content: this.content
    }
    this.service.postReply(validData).subscribe(
      (res: any) => {
        this.toastr.success(res.msg);
        this.listReply.push(res.data);
        this.content = ''
        this.isOpenCreateReply = ''
      },
      (err: any) => {
        this.toastr.error(err.error.msg)
      }
    )
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
      }).catch()
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
    });
  }
}
