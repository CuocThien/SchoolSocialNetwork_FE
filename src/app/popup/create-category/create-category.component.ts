import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    private service: CategoryService
  ) { }
  category: any;
  isEdit = false;
  createCategoryForm: FormGroup;
  type: string;
  title = 'POPUP.CREATE_CATEGORY'
  ngOnInit(): void {
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
      this.toastr.error('Please fill information!')
      return;
    }
    if (!this.isEdit) {
      const data = { ...this.createCategoryForm.value, type: this.type }
      this.service.createNewCategory(data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.createCategoryForm.reset();
          this.activeModal.close(res.data)
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
        }
      })
    } else {
      const data = { ...this.createCategoryForm.value, _id: this.category?._id, type: this.type }
      this.service.editCategory(data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.createCategoryForm.reset();
          this.activeModal.close(res.data)
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
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
