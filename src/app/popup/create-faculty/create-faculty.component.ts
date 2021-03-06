import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private service: FacultyService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }
  faculty: any;
  isEdit = false;
  createFacultyForm: FormGroup;
  title = 'POPUP.CREATE_FACULTY';
  notiFill = ''
  ngOnInit(): void {
    this.translate.get([
      'NOTIFICATION.EMPTY_FORM',
    ])
      .subscribe(translations => {
        this.notiFill = translations['NOTIFICATION.EMPTY_FORM'];
      });
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
      this.toastr.error(this.notiFill)
      return;
    }
    this.spinner.show();
    if (!this.isEdit) {
      this.service.createNewFaculty(this.createFacultyForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.createFacultyForm.reset();
          this.activeModal.close(res.data);
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        }
      })
    } else {
      this.service.editFaculty(this.createFacultyForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.createFacultyForm.reset();
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
  createFormCreateFaculty() {
    this.createFacultyForm = this.formBuilder.group({
      _id: [this.faculty?._id || '', Validators.required],
      nameEn: [this.faculty?.nameEn || '', Validators.required],
      nameVi: [this.faculty?.nameVi || '', Validators.required],
    });
  }
}
