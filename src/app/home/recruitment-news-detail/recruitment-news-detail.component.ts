import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EnterpriseService } from 'src/app/services';

@Component({
  selector: 'app-recruitment-news-detail',
  templateUrl: './recruitment-news-detail.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class RecruitmentNewsDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
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
  ngOnInit(): void {
    const params = this.route.snapshot.params || {}
    this.companyId = params.companyId;
    this.newsId = params.newsId;
    this._getNewsDetail();
    this._getNewsSameCompany();
  }

  private _getNewsDetail() {
    this.spinner.show();
    this.service.getRecruitmentNewsDetail(this.newsId).subscribe({
      next: (res: any) => {
        this.data = res.data;
        this.spinner.hide();
        console.log("🐼 => RecruitmentNewsDetailComponent => this.data", this.data)
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
        console.log("🐼 => RecruitmentNewsDetailComponent => this.listRecruitmentNews", this.listRecruitmentNews)
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
