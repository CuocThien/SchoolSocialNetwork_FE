import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteUserComponent } from 'src/app/popup/delete-user/delete-user.component';
import { UpdateUserInfoComponent } from 'src/app/popup/update-user-info/update-user-info.component';
import { AccountService, FacultyService, UsersService } from 'src/app/services/index';
import { LIST_ROLE } from 'src/app/utils/constant';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private service: AccountService,
    private facultyService: FacultyService,
    private modalService: NgbModal,
    private userService: UsersService
  ) { }
  isLangEn = false;
  keyword = '';
  listFaculty = [];
  groupId: any;
  listUsers = [];
  page = 1;
  maxPage = 1;
  roleId = 4;
  isDeleted = false;
  isSearch = false;
  listRole = LIST_ROLE.filter(itm => itm.roleId != 1);

  isAdmin = false;
  isDean = false;
  private modalRef: NgbModalRef;
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en'
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'admin';
    this.isDean = role === 'dean';
    if (this.isAdmin) {
      this._listFaculty();
      return;
    }
    if (this.isDean) {
      this._facultyByDean();
    }
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  filterDeleted() {
    this.isDeleted = !this.isDeleted;
    this._getListAccount();
  }
  filterFaculty() {
    this._getListAccount();
  }
  filterRole() {
    this._getListAccount();
  }
  deleteMultipleAccount() {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.isAccount = true;
    this.modalRef.componentInstance.isMulti = true;
    this.modalRef.result.then((res: any) => {
      this._getListAccount();
    }).catch(() => {

    });
  }
  deleteAccount(user: any) {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.data = user;
    this.modalRef.componentInstance.isAccount = true;
    this.modalRef.result.then((res: any) => {
      this._getListAccount();
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
    this.modalRef.componentInstance.isAccount = true;
    this.modalRef.result.then((res: any) => {
      this._getListAccount();
    }).catch(() => {

    });
  }
  recoveryAccount(user: any) {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.data = user;
    this.modalRef.result.then((res: any) => {
      this._getListAccount();
    }).catch(() => {

    });
  }
  searchUser() {
    if (this.keyword == '') return;
    if (this.roleId == 2)
      this.roleId = 4;
    this.isSearch = true;
    this.page = 1;
    this._search();

  }
  private _search() {
    let reqData = {
      groupId: this.groupId,
      keyword: this.keyword,
      page: this.page,
      isDelete: this.isDeleted
    }
    reqData = this.roleId == 4 ?
      Object.assign(reqData, { isStudent: true }) : Object.assign(reqData, { isStudent: false })
    this.spinner.show();
    this.userService.searchUser(reqData).subscribe({
      next: (res: any) => {
        this.listUsers = res.data.result.map((itm: any) => {
          itm._id = itm.userId
          return itm;
        });
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
    this.keyword = ''
  }
  goToPage(event: any) {
    this.page = event;
    if (this.isSearch) {
      this._search();
      return;
    }
    this._getListAccount();
  }
  private _listFaculty() {
    this.spinner.show();
    this.facultyService.getListAllFaculty().subscribe({
      next: (res: any) => {
        this.listFaculty = res.data.result.map((itm: any) => {
          const { _id, nameEn, nameVi } = itm || {}
          return {
            _id, nameEn, nameVi
          }
        });
        this.groupId = this.listFaculty[0]._id || {};
        this._getListAccount();
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
  private _getListAccount() {
    const reqData = {
      roleId: this.roleId,
      faculty: this.groupId,
      isDelete: this.isDeleted,
      page: this.page
    }
    this.spinner.show();
    this.service.getListAccount(reqData).subscribe({
      next: (res: any) => {
        this.listUsers = res.data.profile;
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
  private _facultyByDean() {
    this.spinner.show();
    this.facultyService.getFacultyByDean().subscribe({
      next: (res: any) => {
        this.listFaculty = res.data.result.map((itm: any) => {
          const { _id, nameEn, nameVi } = itm || {}
          return {
            _id, nameEn, nameVi
          }
        });
        this.groupId = this.listFaculty[0]._id || {};
        this._getListAccount();
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
}
