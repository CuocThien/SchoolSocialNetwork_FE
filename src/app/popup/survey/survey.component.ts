import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService, } from 'src/app/services';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class SurveyComponent implements OnInit {

  constructor(
    private service: CategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activeModal: NgbActiveModal
  ) { }
  isChooseAll = false;
  isLangEn = false;
  listCategoryGroup = [];
  listCategoryPicked = []

  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en'
    this.spinner.show();
    this.service.getListCategory({}).subscribe({
      next: (res: any) => {
        this.listCategoryGroup = res.data;
        this.listCategoryGroup = this.listCategoryGroup.map(itm => {
          return {
            ...itm,
            isPicked: false
          }
        })
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    })
  }
  pick(item: any, index: any) {
    if (item.isPicked) {
      this.listCategoryGroup[index].isPicked = false;
      this.listCategoryPicked = this.listCategoryPicked.filter((itm: any) => itm._id != item._id);
      return;
    }
    this.listCategoryGroup[index].isPicked = true;
    this.listCategoryPicked.push(item);
    if (this.listCategoryPicked.length === this.listCategoryGroup.length)
      this.isChooseAll = true;
  }
  remove(item: any, index: any) {
    this.listCategoryPicked.splice(index, 1);
    this.listCategoryGroup = this.listCategoryGroup.map((itm: any) => {
      if (itm._id === item._id) {
        return {
          ...itm,
          isPicked: false,
        }
      }
      return {
        ...itm
      }
    })

  }
  chooseAll(event: any) {
    event.preventDefault();
    this.isChooseAll = !this.isChooseAll;
    if (this.isChooseAll) {
      this.listCategoryGroup = this.listCategoryGroup.map(itm => {
        return {
          ...itm,
          isPicked: true
        }
      })
      this.listCategoryPicked = this.listCategoryGroup;
      return;
    }
    this.listCategoryGroup = this.listCategoryGroup.map(itm => {
      return {
        ...itm,
        isPicked: false
      }
    })
    this.listCategoryPicked = [];
  }
  removeAll() {
    this.listCategoryGroup = this.listCategoryGroup.map(itm => {
      return {
        ...itm,
        isPicked: false
      }
    })
    this.listCategoryPicked = [];
    this.isChooseAll = false;
  }

  onCancel() {
    this.activeModal.dismiss();
  }
  onSubmit() {
    this.spinner.show();
    if (!this.listCategoryPicked.length)
      this.listCategoryPicked = [{ _id: "none" }];
    this.service.addAOC({ cateId: map(this.listCategoryPicked, '_id') }).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.spinner.hide();
        this.activeModal.close(res);
        localStorage.removeItem('isSurvey')
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
  }
}
