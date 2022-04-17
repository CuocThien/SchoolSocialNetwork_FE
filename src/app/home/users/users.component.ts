import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TransferFacultyComponent } from 'src/app/popup/transfer-faculty/transfer-faculty.component';
import { FacultyService, UsersService } from '../../services/index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private service: UsersService,
    private facultyService: FacultyService,
    private toastr: ToastrService,
    private modalService: NgbModal,

  ) { }
  private modalRef: NgbModalRef;
  groupId: any;
  group: any;
  listUsers: any;
  listFaculty: any;
  listAllFaculty: any;
  isAdmin = false;
  isDean = false;
  isLangEn = false;
  isStudent = false;
  keyword = '';
  page = 1;
  maxPage = 1;
  isSearch = false;
  ngOnInit(): void {
    this.isLangEn = (localStorage.getItem('lang') === 'en');
    const role = localStorage.getItem('role')
    this.isAdmin = role === 'admin'
    this.isDean = role === 'dean'
    this._listFaculty();
    if (this.isDean) {
      this._facultyByDean();
    }
  }
  ngAfterViewInit() {
    if (this.isDean) {
      this._facultyByDean();
    }
  }

  ngDoCheck() {
    this.isLangEn = (localStorage.getItem('lang') === 'en');
  }
  filterFaculty() {
    this.page = 1;
    this._getListUser({ groupId: this.groupId, isStudent: this.isStudent });
  }
  filterStudent() {
    this.page = 1;
    this.isStudent = !this.isStudent;
    this._getListUser({ groupId: this.groupId, isStudent: this.isStudent });
  }
  searchUser() {
    this.page = 1;
    const reqData = {
      keyword: this.keyword,
      groupId: this.groupId,
      page: this.page,
      isStudent: this.isStudent
    }
    if (this.keyword) {
      this.isSearch = true;
      this._searchUser(reqData)
    } else {
      this.isSearch = false;
      this._getListUser({ groupId: this.groupId, isStudent: this.isStudent, page: this.page });
    }
  }

  private _searchUser(data: any) {
    this.service.searchUser(data).subscribe({
      next: (res: any) => {
        this.listUsers = res.data.result;
        this.maxPage = Math.ceil(res.data.total / 10)
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
  }
  private _getListUser(data: any) {
    this.service.getListUser(data).subscribe({
      next: (res: any) => {
        this.listUsers = res.data.result;
        this.maxPage = Math.ceil(res.data.total / 10)
      }
    })
  }

  private _listFaculty() {
    this.facultyService.getListAllFaculty().subscribe({
      next: (res: any) => {
        this.listAllFaculty = this.listFaculty = res.data.result.map((itm: any) => {
          const { _id, nameEn, nameVi } = itm || {}
          return {
            _id, nameEn, nameVi
          }
        });
        this.listFaculty.push(
          { _id: 'grgv', nameEn: 'Group for Teacher', nameVi: 'Nhóm dành cho giảng viên' },
          { _id: 'grsv', nameEn: 'Group for Student', nameVi: 'Nhóm dành cho sinh viên' }
        )
        this.groupId = this.listFaculty[0]._id || {};
        this._getListUser({ groupId: this.groupId, isStudent: this.isStudent });
      }
    })
  }
  private _facultyByDean() {
    this.facultyService.getFacultyByDean().subscribe({
      next: (res: any) => {
        this.listFaculty = res.data.result.map((itm: any) => {
          const { _id, nameEn, nameVi } = itm || {}
          return {
            _id, nameEn, nameVi
          }
        });
        this.groupId = this.listFaculty[0]._id || {};
        this._getListUser({ groupId: this.groupId, isStudent: this.isStudent });
      }
    })
  }
  goToPage(event: any) {
    this.page = event;
    const reqData = {
      keyword: this.keyword,
      groupId: this.groupId,
      page: this.page,
      isStudent: this.isStudent
    }
    if (this.isSearch) {
      this._searchUser(reqData)
      return;
    }
    this._getListUser({ groupId: this.groupId, isStudent: this.isStudent, page: this.page });
  }
  transferFaculty(user: any, index: any) {
    this.group = this.listFaculty.filter(itm => itm._id == this.groupId)[0] || {}
    this.modalRef = this.modalService.open(TransferFacultyComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    })
    this.modalRef.componentInstance.userId = user.userId;
    this.modalRef.componentInstance.facultyFrom = this.group;
    this.modalRef.componentInstance.listFaculty = this.listAllFaculty;
    this.modalRef.result.then((res: any) => {
      this.listUsers.splice(index, 1);
    }).catch((err: any) => { })
  }
}
