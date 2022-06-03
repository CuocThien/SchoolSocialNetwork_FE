import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class UpdateUserInfoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private service: ProfileService
  ) { }
  isLangEn = false;
  data: any;
  userInfoForm: FormGroup;
  isCompany = false;

  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    if (!this.isCompany) {
      this.createFormUserInfo();
      return;
    }
    this.createFormCompanyInfo();
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }

  onSubmit() {
    this.spinner.show();
    this.service.updateUser(this.userInfoForm.value).subscribe({
      next: (res: any) => {
        this.activeModal.close(res)
        this.toastr.success(res.msg);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
  }

  onCancel() {
    this.activeModal.dismiss();
  }
  createFormUserInfo() {
    this.userInfoForm = this.formBuilder.group({
      _id: [this.data._id || '', Validators.required],
      fullname: [this.data.fullname || '', Validators.required],
      dob: [moment(this.data.dob).format('YYYY-MM-DD') || '', Validators.required],
      address: [this.data.address || '', Validators.required],
      phone: [this.data.phone || '', Validators.required],
      year: [this.data.year || '', Validators.required],
    });
  }
  createFormCompanyInfo() {
    this.userInfoForm = this.formBuilder.group({
      _id: [this.data._id || '', Validators.required],
      fullname: [this.data.fullname || '', Validators.required],
      address: [this.data.address || '', Validators.required],
      phone: [this.data.phone || '', Validators.required],
      email: [this.data.email || '', Validators.required],
      description: [this.data.description || '', Validators.required],
    });
  }
}
