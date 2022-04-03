import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from 'src/app/services';

@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class CreateFacultyComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: FacultyService
  ) { }
  faculty: any;
  isEdit = false;
  createFacultyForm: FormGroup;
  title = 'POPUP.CREATE_FACULTY'
  ngOnInit(): void {
    if (this.faculty) {
      this.isEdit = true;
      this.title = 'POPUP.UPDATE_FACULTY'
    }
    this.createFormCreateFaculty();
  }
  onClose() {
    this.activeModal.dismiss('failed');
  }
  onSubmit() {
    if (this.createFacultyForm.invalid) {
      this.toastr.error('Please fill information!')
      return;
    }
    if (!this.isEdit) {
      this.service.createNewFaculty(this.createFacultyForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.createFacultyForm.reset();
          this.activeModal.close(res.data)
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
        }
      })
    } else {
      this.service.editFaculty(this.createFacultyForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.createFacultyForm.reset();
          this.activeModal.close(res.data)
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
        }
      })
    }
  }
  createFormCreateFaculty() {
    this.createFacultyForm = this.formBuilder.group({
      _id: [this.faculty?._id || '', Validators.required],
      nameEn: [this.faculty?.nameEn || '', Validators.required],
      nameVi: [this.faculty?.nameVi || '', Validators.required],
    });
  }
}
