import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateGroupComponent } from 'src/app/popup/create-group/create-group.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class GroupComponent implements OnInit {

  constructor(
    private modalService: NgbModal,

  ) { }
  private modalRef: NgbModalRef;

  ngOnInit(): void {
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
