import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/index';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class CreateCategoryComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: CategoryService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }
  category: any;
  isEdit = false;
  createCategoryForm: FormGroup;
  type: string;
  title = 'POPUP.CREATE_CATEGORY';
  notiFill = '';
  ngOnInit(): void {
    this.translate.get([
      'NOTIFICATION.EMPTY_FORM',
    ])
      .subscribe(translations => {
        this.notiFill = translations['NOTIFICATION.EMPTY_FORM'];
      });
    if (this.category) {
      this.isEdit = true;
      this.title = 'POPUP.UPDATE_CATEGORY'
    }
    this.createFormCreateCategory();
  }

  onClose() {
    this.activeModal.dismiss('failed');
  }
  onSubmit() {
    if (this.createCategoryForm.invalid) {
      this.toastr.error(this.notiFill)
      return;
    }
    this.spinner.show();
    if (!this.isEdit) {
      const data = { ...this.createCategoryForm.value, type: this.type }
      this.service.createNewCategory(data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.createCategoryForm.reset();
          this.activeModal.close(res.data);
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        }
      })
    } else {
      const data = { ...this.createCategoryForm.value, _id: this.category?._id, type: this.type }
      this.service.editCategory(data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.createCategoryForm.reset();
          this.activeModal.close(res.data);
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        }
      })
    }
  }
  createFormCreateCategory() {
    this.createCategoryForm = this.formBuilder.group({
      nameEn: [this.category?.nameEn || '', Validators.required],
      nameVi: [this.category?.nameVi || '', Validators.required],
    });
  }
}
