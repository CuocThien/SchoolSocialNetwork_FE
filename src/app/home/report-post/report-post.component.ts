import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService
  ) { }
  private modalRef: NgbModalRef;
  page = 1;
  maxPage = 1;
  listReportPost: any;
  listTypeReport: any;
  listGroup: any;
  isLangEn = false;
  groupId = '';
  isAdminSubGr = false;
  isAdmin = false;

  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this.isAdminSubGr = localStorage.getItem('isAdminSubGr') === 'true';
    this.isAdmin = localStorage.getItem('role') === 'admin';
    if (this.isAdmin) {
      this._getListReportPost();
      this._getListGroup();
      return;
    }
    this._getListGroupForAdminSubGroup();
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  private _getListReportPost() {
    this.spinner.show();
    const reqData = this.groupId ? { page: this.page, groupId: this.groupId } : { page: this.page };
    this.service.getListReportPost(reqData).subscribe({
      next: (res: any) => {
        this.listReportPost = res.data.result || [];
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        if (!this.listTypeReport && this.listReportPost.length)
          this.listTypeReport = this.listReportPost[0].report;
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
  private _getListGroup() {
    this.service.getListGroup({}).subscribe({
      next: (res: any) => {
        this.listGroup = res.data.result;
      }
    })
  }
  private _getListGroupForAdminSubGroup() {
    this.service.getListGroupForAdminSubGroup().subscribe({
      next: (res: any) => {
        this.listGroup = res.data.result;
        this.groupId = this.listGroup[0]._id;
        this._getListReportPost();
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
    this._getListReportPost();
  }
}
