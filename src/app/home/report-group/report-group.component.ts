import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services';

@Component({
  selector: 'app-report-group',
  templateUrl: './report-group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ReportGroupComponent implements OnInit {

  constructor(
    private service: GroupService
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
    this.service.getListReportGroup({ page: this.page }).subscribe({
      next: (res: any) => {
        this.listReportGroup = res.data;
        if (!this.listTypeReport)
          this.listTypeReport = this.listReportGroup[0].report;
      }
    })
  }
  goToPage($event) {

  }

}
