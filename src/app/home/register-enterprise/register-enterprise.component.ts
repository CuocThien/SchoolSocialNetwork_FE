import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SignUpService, UploadImageService } from 'src/app/services';
import { exportAsExcelFile } from 'src/app/utils/function';

@Component({
  selector: 'app-register-enterprise',
  templateUrl: './register-enterprise.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class RegisterEnterpriseComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private uploadImageService: UploadImageService,
    private toastr: ToastrService,
    private service: SignUpService
  ) { }
  registerForm: FormGroup;
  imageSrc: any;

  ngOnInit(): void {
    this.createFormRegister()
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill information!')
      return;
    }

    const validData = Object.assign(this.registerForm.value, { avatar: this.imageSrc })
    this.spinner.show();
    this.service.registerEnterprise(validData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.registerForm.reset();
        exportAsExcelFile([res.data], [], 'company_signup');
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.spinner.show()
      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'angular_cloudinary');
      data.append('cloud_name', 'blogreview')
      this.uploadImageService.updateImage(data)
        .then((res: any) => {
          this.imageSrc = res.url;
          this.spinner.hide();
        })
        .catch(err => {
          this.toastr.error(err.error.msg);
          this.spinner.hide()
        })
    }
  }
  createFormRegister() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      abbreviation: ['', Validators.required],
    });
  }
}
