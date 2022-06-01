import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { keyBy } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EnterpriseService } from 'src/app/services';
import { LIST_EXPERIENCE } from 'src/app/utils/constant';

@Component({
  selector: 'app-recruitment-news-detail',
  templateUrl: './recruitment-news-detail.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class RecruitmentNewsDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EnterpriseService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  companyId: any;
  newsId: any;
  data: any;
  page = 1;
  maxPage = 0;
  listRecruitmentNews = [];
  isDetailActive = true;
  isLangEn = false;
  objExperience = keyBy(LIST_EXPERIENCE, 'id')
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    const params = this.route.snapshot.params || {}
    this.companyId = params.companyId;
    this.newsId = params.newsId;
    this._getNewsDetail();
  }

  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en';
  }
  private _getNewsDetail() {
    this.spinner.show();
    this.service.getRecruitmentNewsDetail(this.newsId).subscribe({
      next: (res: any) => {
        this.data = res.data;
        if (this.data.isExpire) {
          this.router.navigate([`/**`])
        }
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(err.error.msg);
      }
    })
  }

  private _getNewsSameCompany() {
    this.spinner.show();
    const reqData = {
      page: this.page,
      companyId: this.companyId,
      newsId: this.newsId
    }
    this.service.getListNewsSameCompany(reqData).subscribe({
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
    this._getNewsSameCompany();
  }
  onDetail() {
    this.isDetailActive = true;
  }
  onOtherJobs() {
    this.isDetailActive = false;
    this._getNewsSameCompany();
  }
  readNewsDetail(newsId: any) {
    this.router.navigate([`/home/enterprise/${this.companyId}/${newsId}`])
    this.newsId = newsId;
    this._getNewsDetail();
    this.isDetailActive = true;
  }
}
