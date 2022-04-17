import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GroupService, UsersService } from 'src/app/services';

@Component({
  selector: 'app-change-admin',
  templateUrl: './change-admin.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ChangeAdminComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private service: UsersService,
    private groupService: GroupService,
    private toastr: ToastrService

  ) { }
  dean: any;
  oldDean: any;
  isLangEn = false;
  faculty: any;
  listUsers = [];
  page = 1;
  maxPage = 1;
  totalMember = 0;
  isSearch = false;
  searchString = '';

  ngOnInit(): void {

    this.isLangEn = localStorage.getItem('lang') === 'en';
    this._getListUser();
    this.dean = this.faculty.profile;
    this.oldDean = this.faculty.profile;

    this.dean.userId = this.dean._id;
  }
  onSubmit() {
    if (this.oldDean._id == this.dean.userId) {
      this.toastr.warning(`${this.isLangEn ? 'Please choose another teacher to change dean' : 'Chọn một giảng viên khác để làm trưởng khoa'}`);
      return;
    }
    const reqData = {
      userId: this.dean.userId,
      groupId: this.faculty._id,
      type: 'main'
    }
    this.groupService.changeAdmin(reqData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.activeModal.close(res);
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
      }
    })
  }
  search() {
    this.page = 1;
    this.isSearch = true;
    this.listUsers = []
    if (this.searchString == '') {
      this.isSearch = false;
      this._getListUser();
      this.dean = this.oldDean;
      return;
    }
    this._search();
  }
  private _search() {
    this.service.searchUser({
      type: 'main',
      groupId: this.faculty._id,
      keyword: this.searchString,
      page: this.page
    }).subscribe({
      next: (res: any) => {
        this.listUsers = [...this.listUsers, ...res.data.result];
        this.maxPage = this.totalMember = Math.ceil(res.data.total / 10);
      }
    })
  }
  onCancel() {
    this.activeModal.dismiss();
  }

  changeAdmin(user: any, index: any) {
    this.listUsers[index] = this.dean;
    this.dean = user;
  }
  goToPage() {
    this.page++;
    if (this.isSearch) {
      this._search();
      return;
    }
    this._getListUser();
  }

  private _getListUser() {
    this.service.getListUser({ groupId: this.faculty._id, isStudent: false, page: this.page }).subscribe({
      next: (res: any) => {
        this.listUsers = [...this.listUsers, ...res.data.result];
        this.maxPage = Math.ceil(res.data.total / 10)
        this.totalMember = res.data.total
      }
    })
  }
}
