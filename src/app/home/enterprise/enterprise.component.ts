import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { keyBy } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EnterpriseService } from 'src/app/services';
import { LIST_EXPERIENCE } from 'src/app/utils/constant';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {

  constructor(
    private router: Router,
    private service: EnterpriseService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  page = 1;
  maxPage = 0;
  listRecruitmentNews = [];
  isDetailActive = true;
  isLangEn = false;
  objExperience = keyBy(LIST_EXPERIENCE, 'id')
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this._getListNews();

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
    this._getListNews();
  }
  readNewsDetail(news: any) {
    this.router.navigate([`/home/enterprise/${news?.companyId}/${news?._id}`])
  }

}
