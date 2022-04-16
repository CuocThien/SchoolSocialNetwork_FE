import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserComponent } from 'src/app/popup/delete-user/delete-user.component';
import { GroupService } from 'src/app/services';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ReportPostComponent implements OnInit {

  constructor(
    private service: GroupService,
    private modalService: NgbModal,
  ) { }
  private modalRef: NgbModalRef;
  page = 1;
  maxPage = 1;
  listReportPost: any;
  listTypeReport: any;
  listGroup: any;
  isLangEn = false;
  groupId = '';

  ngOnInit(): void {
    this._getListReportPost();
    this._getListGroup();
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  private _getListReportPost() {
    const reqData = this.groupId ? { page: this.page, groupId: this.groupId } : { page: this.page };
    this.service.getListReportPost(reqData).subscribe({
      next: (res: any) => {
        this.listReportPost = res.data.result || [];
        this.maxPage = Math.ceil(res.data.total / 10)
        if (!this.listTypeReport)
          this.listTypeReport = this.listReportPost[0].report;
      }
    })
  }
  private _getListGroup() {
    this.service.getListGroup().subscribe({
      next: (res: any) => {
        this.listGroup = res.data.result;
      }
    })
  }
  goToPage(event: any) {
    this.page = event;
    this._getListReportPost();
  }
  deletePost(postId: any) {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.data = { postId };
    this.modalRef.componentInstance.isPost = true;
    this.modalRef.result.then((res: any) => {
      this._getListReportPost();
    }).catch(() => { });
  }
  filterGroup() {
    console.log(this.groupId)
    this._getListReportPost();
  }
}
