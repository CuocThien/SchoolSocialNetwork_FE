import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteUserComponent } from 'src/app/popup/delete-user/delete-user.component';
import { GroupService } from 'src/app/services';

@Component({
  selector: 'app-report-group',
  templateUrl: './report-group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ReportGroupComponent implements OnInit {

  constructor(
    private service: GroupService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) { }
  page = 1;
  maxPage = 1;
  listReportGroup: any;
  listTypeReport: any;
  isLangEn = false;
  private modalRef: NgbModalRef;
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
        if (!this.listTypeReport && this.listReportGroup.length)
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

  onDelete(group: any, index: any) {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.componentInstance.isGroup = true;
    this.modalRef.componentInstance.data = group.groupId
    this.modalRef.result.then((res: any) => {
      this.listReportGroup.splice(index, 1);
    }).catch((err: any) => {

    });
  }

}
