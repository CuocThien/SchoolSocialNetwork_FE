import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ReportPostComponent implements OnInit {

  constructor(
    private service: GroupService
  ) { }
  page = 1;
  maxPage = 1;
  listReportPost: any;
  listTypeReport: any;
  isLangEn = false;
  ngOnInit(): void {
    this._getListReportPost();
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  private _getListReportPost() {
    this.service.getListReportPost({ page: this.page }).subscribe({
      next: (res: any) => {
        this.listReportPost = res.data;
        if (!this.listTypeReport)
          this.listTypeReport = this.listReportPost[0].report;
      }
    })
  }
  goToPage($event) { }
}
