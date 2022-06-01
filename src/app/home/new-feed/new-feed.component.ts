import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { keyBy } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreatePostComponent } from 'src/app/popup/create-post/create-post.component';
import { DeleteUserComponent } from 'src/app/popup/delete-user/delete-user.component';
import { ReportComponent } from 'src/app/popup/report/report.component';
import { EnterpriseService, HomeIndexService } from 'src/app/services';
import { LIST_EXPERIENCE } from 'src/app/utils/constant';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class NewFeedComponent implements OnInit {

  constructor(
    private enterpriseService: EnterpriseService,
    private service: HomeIndexService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }
  myAvatar: any;
  fullname: any;
  listPost = [];
  page = 1;
  maxPage = 1;
  objExperience = keyBy(LIST_EXPERIENCE, 'id');
  isLangEn = false;

  listPostRecruitment = [];
  pageRecruitment = 1;
  maxPageRecruitment = 1;
  isAdmin = false;
  userId: any;
  private modalRef: NgbModalRef;

  ngOnInit(): void {
    this.myAvatar = JSON.parse(localStorage.getItem('profile') || '').avatar;
    this.fullname = JSON.parse(localStorage.getItem('profile') || '').fullname;
    this.userId = JSON.parse(localStorage.getItem('profile') || '')._id;
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this._getListPost();
    this._getListRecruimentNews();
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en';
  }
  goToPage() {
    this.page++;

    this._getListPost();
  }
  private _getListPost() {
    this.spinner.show();
    this.service.getListPostOnNewFeed(this.page).subscribe({
      next: (res: any) => {
        this.listPost = [...this.listPost, ...res.data.result];
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
  deletePost(postId: any, index: any) {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.data = { postId };
    this.modalRef.componentInstance.isPost = true;
    this.modalRef.result.then((res: any) => {
      this.listPost.splice(index, 1)
    }).catch(() => { });
  }
  updatePost(post: any, index: any) {
    this.modalRef = this.modalService.open(CreatePostComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.componentInstance.groupId = post.group._id;
    this.modalRef.componentInstance.postId = post._id;
    this.modalRef.componentInstance.content = post.content;
    this.modalRef.componentInstance.isUpdate = true;

    this.modalRef.result.then((res: any) => {
      const data = res.data;
      data.avatar = this.myAvatar;
      data.fullname = this.fullname;
      data.group = post.group;
      data.countCmt = post.countCmt;
      this.listPost[index] = data;
    }).catch(() => { });
  }
  report(type: any, id: any) {
    this.modalRef = this.modalService.open(ReportComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.type = type;
    this.modalRef.componentInstance.id = id;
    this.modalRef.result.then((res: any) => {
      this.toastr.success(res.msg)
    }).catch(() => { });
  }
  goToGroup(post: any) {
    this.router.navigate([`home/group/${post.group._id}`])
  }
  private _getListRecruimentNews() {
    this.spinner.show();
    this.enterpriseService.getListNewsForNewfeed({ page: this.pageRecruitment }).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.listPostRecruitment = res.data.result;
        this.maxPageRecruitment = res.data.total ? Math.ceil(res.data.total / 3) : 1;

      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(err.error.msg);
      }
    })
  }
  nextNews() {
    this.pageRecruitment++;
    if (this.pageRecruitment > 3 || this.pageRecruitment > this.maxPageRecruitment)
      this.pageRecruitment = 1;
    this._getListRecruimentNews();
  }
  preNews() {
    this.pageRecruitment--;
    if (this.pageRecruitment < 1)
      this.pageRecruitment = this.maxPageRecruitment > 3 ? 3 : this.maxPageRecruitment;
    this._getListRecruimentNews();
  }
  readNewsDetail(news: any) {
    this.router.navigate([`/home/enterprise/${news?.companyId}/${news?._id}`])
  }
}
