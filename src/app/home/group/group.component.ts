import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreateGroupComponent } from 'src/app/popup/create-group/create-group.component';
import { GroupService } from 'src/app/services';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class GroupComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private service: GroupService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }
  private modalRef: NgbModalRef;
  searchString = '';
  isSearch = false;
  userId: any;
  page = 1;
  maxPage = 1;
  listGroup = [];
  pageRelative = 1;
  maxPageRelative = 1;
  listGroupRelative = [];
  ngOnInit(): void {
    this._getListGroup();
    this._getListGroupRelative();
    this.userId = JSON.parse(localStorage.getItem('profile'))._id || ''
  }

  private _getListGroup() {
    this.spinner.show();
    this.service.getListGroupByUserId({ page: this.page }).subscribe({
      next: (res: any) => {
        this.listGroup = [...this.listGroup, ...res.data.result];
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
  private _getListGroupRelative() {
    this.spinner.show();
    this.service.getListGroupRelative({ page: this.page }).subscribe({
      next: (res: any) => {
        this.listGroupRelative = [...this.listGroupRelative, ...res.data.result];
        this.maxPageRelative = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
  redirectGroupDetail(groupId: any) {
    this.router.navigate([`home/group/${groupId}`])
  }
  goToPage() {
    this.page++;
    if (this.isSearch) {
      this._search();
      return;
    }
    this._getListGroup();
  }
  goToPageRelative() {
    this.pageRelative++;
    this._getListGroupRelative();
  }
  createGroup() {
    this.modalRef = this.modalService.open(CreateGroupComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.result.then((res: any) => {
    }).catch((err: any) => {
      // console.log("💁 => CategoryComponent => err", err)

    });
  }
  joinNow(group: any, index: any) {
    this.spinner.show();
    this.service.addUser({
      groupId: group._id,
      userId: this.userId
    }).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        group.groupId = group._id;
        this.listGroupRelative.splice(index, 1);
        this.listGroup.push(group);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
  }
  private _search() {
    this.spinner.show();
    this.service.searchGroup({
      keyword: this.searchString,
      page: this.page
    }).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.listGroup = [...this.listGroup, ...res.data.result];
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
      },
      error: () => {
        this.spinner.hide();
      }
    })
  }
  searchGroup() {
    this.listGroup = []
    if (!this.searchString) {
      this.isSearch = false;
      this._getListGroup();
      return;
    }
    this.isSearch = true;
    this.page = 1;
    this.listGroup
    this._search();
  }
}
