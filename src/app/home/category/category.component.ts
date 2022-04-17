import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreateCategoryComponent } from 'src/app/popup/create-category/create-category.component';
import { DeleteCategoryComponent } from 'src/app/popup/delete-category/delete-category.component';
import { CategoryService } from '../../services/index';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private service: CategoryService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }
  private modalRef: NgbModalRef;

  category = 'group';
  isDelete = false;
  listCategory: any;
  ngOnInit(): void {
    this._getListCategory();
  }
  filterDeleted() {
    this.isDelete = !this.isDelete;
    this._getListCategory();
  }
  filterCategory() {
    this._getListCategory();
  }
  createCategory() {
    this.modalRef = this.modalService.open(CreateCategoryComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.componentInstance.type = this.category;
    this.modalRef.result.then((res: any) => {
      this.listCategory.push(res)
    }).catch((err: any) => {
      // console.log("💁 => CategoryComponent => err", err)
    });
  }
  editCategory(category: any, index: any) {
    this.modalRef = this.modalService.open(CreateCategoryComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.componentInstance.type = this.category;
    this.modalRef.componentInstance.category = category
    this.modalRef.result.then((res: any) => {
      this.listCategory[index] = res;
    }).catch((err: any) => {
      // console.log("💁 => CategoryComponent => err", err)

    });
  }
  deleteCategory(category: any, index: any) {
    this.modalRef = this.modalService.open(DeleteCategoryComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.componentInstance.isDelete = true;
    this.modalRef.componentInstance.type = this.category;
    this.modalRef.componentInstance.category = category
    this.modalRef.result.then((res: any) => {
      this.listCategory.splice(index, 1);
    }).catch((err: any) => {
      // console.log("💁 => CategoryComponent => err", err)

    });
  }
  restoreCategory(category: any, index: any) {
    this.modalRef = this.modalService.open(DeleteCategoryComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.componentInstance.isDelete = false;
    this.modalRef.componentInstance.type = this.category;
    this.modalRef.componentInstance.category = category
    this.modalRef.result.then((res: any) => {
      this.listCategory.splice(index, 1);
    }).catch((err: any) => {
      // console.log("💁 => CategoryComponent => err", err)

    });
  }
  private _getListCategory() {
    this.spinner.show();
    this.service.getListCategory({ type: this.category, isDelete: this.isDelete }).subscribe(
      (res: any) => {
        this.listCategory = res.data || [];
        this.spinner.hide();
      }
    )
  }
}
