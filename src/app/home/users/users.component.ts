import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddUserGroupComponent } from 'src/app/popup/add-user-group/add-user-group.component';
import { DeleteUserComponent } from 'src/app/popup/delete-user/delete-user.component';
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
  isAdmin = false;
  isLangEn = false;
  isStudent = false;
  keyword = '';
  page = 1;
  maxPage = 1;
  isSearch = false;
  ngOnInit(): void {
    this._listFaculty();
    this.isAdmin = (localStorage.getItem('role') === 'admin')
    this.isLangEn = (localStorage.getItem('lang') === 'en');
  }

  ngDoCheck() {
    this.isLangEn = (localStorage.getItem('lang') === 'en');
  }
  filterCategory() {
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
  deleteUser(user: any, index: any) {
    const reqData = {
      userId: user.userId,
      groupId: this.groupId,
      type: 'main'
    }
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.componentInstance.data = reqData;
    this.modalRef.result.then((res: any) => {
      this.listUsers.splice(index, 1)
    }).catch((err: any) => {
      // console.log("💁 => FacultyComponent => err", err)
    });
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
        this.listFaculty = res.data.map((itm: any) => {
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
  addUser() {
    this.modalRef = this.modalService.open(AddUserGroupComponent, {
      size: 'md',
      centered: true,
    });
    this.modalRef.componentInstance.isMain = true;
    this.modalRef.componentInstance.groupId = this.groupId;
    this.modalRef.componentInstance.isStudent = this.isStudent;
    this.modalRef.result.then((res: any) => {
    }).catch((err: any) => {
      // console.log("💁 => FacultyComponent => err", err)
    });
  }
}
