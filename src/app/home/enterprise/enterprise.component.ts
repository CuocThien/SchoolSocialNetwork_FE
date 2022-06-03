import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { keyBy } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreateRecruitmentNewsComponent } from 'src/app/popup/create-recruitment-news/create-recruitment-news.component';
import { DeleteUserComponent } from 'src/app/popup/delete-user/delete-user.component';
import { EnterpriseService } from 'src/app/services';
import { LIST_EXPERIENCE } from 'src/app/utils/constant';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class EnterpriseComponent implements OnInit {

  constructor(
    private router: Router,
    private service: EnterpriseService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }
  page = 1;
  maxPage = 0;
  listRecruitmentNews = [];
  isDetailActive = true;
  isLangEn = false;
  searchString = ''
  objExperience = keyBy(LIST_EXPERIENCE, 'id');
  isCompany = false;
  companyId = '';
  isSearch = false;

  private modalRef: NgbModalRef;

  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this._getListNews();
    this.isCompany = localStorage.getItem('role') === 'company';
    this.companyId = JSON.parse(localStorage.getItem('profile'))._id;
  }

  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en';
  }


  private _getListNews() {
    this.spinner.show();
    const reqData = {
      page: this.page,
      limit: 10
    }
    this.service.getListNewsForNewfeed(reqData).subscribe({
      next: (res: any) => {
        this.listRecruitmentNews = res.data.result;
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(err.error.msg);
      }
    })
  }
  goToPage(event: any) {
    this.page = event;
    if (this.isSearch) {
      this._searchNews();
      return;
    }
    this._getListNews();
  }
  readNewsDetail(news: any) {
    this.router.navigate([`/home/enterprise/${news?.companyId}/${news?._id}`])
  }
  createNews() {
    this.modalRef = this.modalService.open(CreateRecruitmentNewsComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.result.then((res: any) => {
      this._getListNews();
    }).catch(() => { });
  }
  updateNews(news: any) {
    this.modalRef = this.modalService.open(CreateRecruitmentNewsComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.componentInstance.isUpdate = true;
    this.modalRef.componentInstance.news = news;
    this.modalRef.result.then((res: any) => {
      this._getListNews();
    }).catch(() => { });
  }
  deleteNews(news: any) {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.componentInstance.isNews = true;
    this.modalRef.componentInstance.data = news;
    this.modalRef.result.then((res: any) => {
      this._getListNews();
    }).catch(() => { });
  }
  searchNews() {
    this.page = 1;
    if (this.searchString) {
      this.isSearch = true;
      this._searchNews();
      return;
    }
    this._getListNews();
  }
  _searchNews() {
    this.spinner.show();
    this.service.searchNews({ page: this.page, limit: 10, keyword: this.searchString }).subscribe({
      next: (res: any) => {
        this.listRecruitmentNews = res.data.result;
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(err.error.msg);
      }
    })
  }
}
