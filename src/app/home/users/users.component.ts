import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  ngOnInit(): void {
    this._listFaculty();
    this.isAdmin = (localStorage.getItem('role') === 'admin')
    this.isLangEn = (localStorage.getItem('lang') === 'en');
  }

  ngDoCheck() {
    this.isLangEn = (localStorage.getItem('lang') === 'en');
  }
  filterCategory() {
    this._getListUser({ groupId: this.groupId, isStudent: this.isStudent });
  }
  filterStudent() {
    this.isStudent = !this.isStudent;
    this._getListUser({ groupId: this.groupId, isStudent: this.isStudent });
  }
  searchUser() {
    const reqData = {
      keyword: this.keyword,
      groupId: this.groupId,
      page: this.page,
      isStudent: this.isStudent
    }
    if (this.keyword) {
      this._searchUser(reqData)
    } else {
      this._getListUser({ groupId: this.groupId, isStudent: this.isStudent });
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
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
  }
  private _getListUser(data: any) {
    this.service.getListUser(data).subscribe({
      next: (res: any) => {
        this.listUsers = res.data;
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

}
