import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
    private router: Router
  ) { }
  private modalRef: NgbModalRef;
  page = 1;
  maxPage = 1;
  listGroup = [];
  pageRelative = 1;
  maxPageRelative = 1;
  listGroupRelative = [];
  ngOnInit(): void {
    this._getListGroup();
    this._getListGroupRelative();
  }

  private _getListGroup() {
    this.service.getListGroupByUserId({ page: this.page }).subscribe({
      next: (res: any) => {
        this.listGroup = [...this.listGroup, ...res.data.result];
        this.maxPage = Math.ceil(res.data.total / 10);
      }
    })
  }
  private _getListGroupRelative() {
    this.service.getListGroupRelative({ page: this.page }).subscribe({
      next: (res: any) => {
        this.listGroupRelative = [...this.listGroupRelative, ...res.data.result];
        this.maxPageRelative = Math.ceil(res.data.total / 10);
      }
    })
  }
  redirectGroupDetail(groupId: any) {
    this.router.navigate([`home/group/${groupId}`])
  }
  goToPage() {
    this.page++;
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
}
