import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GroupService } from 'src/app/services';

@Component({
  selector: 'app-report-group',
  templateUrl: './report-group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ReportGroupComponent implements OnInit {

  constructor(
    private service: GroupService,
    private spinner: NgxSpinnerService
  ) { }
  page = 1;
  maxPage = 1;
  listReportGroup: any;
  listTypeReport: any;
  isLangEn = false;
  ngOnInit(): void {
    this._getListReportGroup();
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }

  private _getListReportGroup() {
    this.spinner.show();
    this.service.getListReportGroup({ page: this.page }).subscribe({
      next: (res: any) => {
        this.listReportGroup = res.data.result;
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        if (!this.listTypeReport)
          this.listTypeReport = this.listReportGroup[0].report;
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
  goToPage(event: any) {
    this.page = event;
    this._getListReportGroup();
  }

}
