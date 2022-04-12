import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChatService, GroupService } from 'src/app/services';

@Component({
  selector: 'app-add-user-group',
  templateUrl: './add-user-group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class AddUserGroupComponent implements OnInit {

  constructor(
    private service: ChatService,
    private groupService: GroupService,
    private toastr: ToastrService

  ) { }
  totalMember: number;
  listMember = [];
  pageUser = 1;
  maxPageUser = 1;
  groupId: any;
  searchString: string;

  ngOnInit(): void {
  }
  private _getListMember() {
    this.service.searchAccount({
      keyword: this.searchString,
      page: this.pageUser
    }).subscribe({
      next: (res: any) => {
        this.listMember = [...this.listMember, ...res.data.result];
        this.maxPageUser = Math.ceil(res.data.total / 10);
        this.totalMember = res.data.total;
      }
    })
  }
  goToPageUser() {
    this.pageUser++;
    this._getListMember();
  }
  search() {
    if (!this.searchString) return;
    this.pageUser = 1;
    this._getListMember();
  }
  addUser(user: any) {
    this.groupService.addUser({
      groupId: this.groupId,
      userId: user._id
    }).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
  }
}
