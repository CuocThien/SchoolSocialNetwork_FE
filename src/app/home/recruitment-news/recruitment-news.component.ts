import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteUserComponent } from 'src/app/popup/delete-user/delete-user.component';
import { UpdateUserInfoComponent } from 'src/app/popup/update-user-info/update-user-info.component';
import { EnterpriseService } from 'src/app/services';

@Component({
  selector: 'app-recruitment-news',
  templateUrl: './recruitment-news.component.html',
  styleUrls: ['./recruitment-news.component.scss']
})
export class RecruitmentNewsComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private service: EnterpriseService,
    private modalService: NgbModal,
  ) { }
  isLangEn = false;
  searchString = '';
  listFaculty = [];
  groupId: any;
  listCompany = [];
  page = 1;
  maxPage = 1;
  roleId = 4;
  isSearch = false;

  private modalRef: NgbModalRef;
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en'
    const role = localStorage.getItem('role');
    this._getListCompany();

  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  deleteAccount(user: any) {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.data = user;
    this.modalRef.componentInstance.isCompany = true;
    this.modalRef.result.then((res: any) => {
      this._getListCompany();
    }).catch(() => {

    });
  }
  updateAccount(user: any) {
    this.modalRef = this.modalService.open(UpdateUserInfoComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.data = user;
    this.modalRef.componentInstance.isCompany = true;
    this.modalRef.result.then((res: any) => {
      this._getListCompany();
    }).catch(() => {

    });
  }


  goToPage(event: any) {
    this.page = event;
    this._getListCompany();
  }
  private _getListCompany() {
    let reqData = {
      page: this.page
    }
    reqData = Object.assign(reqData, { keyword: this.searchString })
    this.spinner.show();
    this.service.getListCompany(reqData).subscribe({
      next: (res: any) => {
        this.listCompany = res.data.result;
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
  searchCompany() {
    this.isSearch = !!this.searchString;
    this._getListCompany();
  }
}
