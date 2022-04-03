import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/index';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class DeleteCategoryComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private service: CategoryService,
    private toastr: ToastrService
  ) { }
  category: any;
  type = '';
  isDelete = true;
  title = 'POPUP.DELETE_CATEGORY'
  ngOnInit(): void {
    if (!this.isDelete) {
      this.title = 'POPUP.RESTORE_CATEGORY'
    }
  }

  onSubmit() {
    if (this.isDelete) {
      const data = { ...this.category, isDelete: true, type: this.type }
      this.service.editCategory(data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res);
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
        }
      })
    } else {
      const data = { ...this.category, isDelete: false, type: this.type }
      this.service.editCategory(data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res);
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
        }
      })
    }
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
