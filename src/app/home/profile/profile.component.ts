import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService, UploadImageService } from '../../services/index';
import * as moment from 'moment'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  imageSrc: any;
  dob: any;
  data: any;
  result: any;
  profile: any;
  OTPCode = '';
  OTPConfirm = '';
  isRequested = false;
  isAble = false;
  isVisible = true;
  intervalId: any;
  timeOut = 120;

  isCompany = false;
  constructor(
    private service: ProfileService,
    private uploadImageService: UploadImageService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '');
    this.isCompany = localStorage.getItem('role') === 'company';
    this.dob = moment(this.profile.dob).format('YYYY-MM-DD')
    this.imageSrc = this.profile.avatar
  }
  ngAfterViewInit() {
    // this.spinner.hide();
  }
  onSubmit(formUpdateProfile: any) {
    this.spinner.show();
    this.data = formUpdateProfile.value;
    this.data["avatar"] = this.imageSrc;
    this.service.updateUser(this.data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.service.getProfile().subscribe({
          next: (res: any) => {
            localStorage.setItem('profile', JSON.stringify(res.data));
            this.profile = JSON.parse(localStorage.getItem('profile') || '');
            this.dob = moment(this.profile.dob).format('YYYY-MM-DD');
            this.imageSrc = this.profile.avatar;
            this.spinner.hide();
          },
          error: (err) => { this.spinner.hide(); }
        })
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    });
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
        .then(res => {
          this.result = res;
          this.imageSrc = this.result.url;
          this.spinner.hide();
        })
        .catch(err => {
          this.toastr.error(err.error.msg);
          this.spinner.hide()
        })
    }
  }

  requestOTP() {
    const _id = JSON.parse(localStorage.getItem('profile'))._id;
    const data = { _id };
    this.service.verifyPhone(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.OTPCode = res.data.content.substring(0, 6);
        this.isRequested = true;
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
    this.intervalId = setInterval(() => {
      --this.timeOut;
      if (this.timeOut < 0) {
        clearInterval(this.intervalId);
        this.OTPCode = ''
        this.isRequested = false;
        this.isAble = false;
        this.timeOut = 120;
      }
    }, 1000)
  }

  submitOTP() {
    if (this.OTPConfirm == this.OTPCode && this.OTPCode != '') {
      window.clearInterval(this.intervalId);
      this.isAble = true;
      this.isRequested = false;
      this.isVisible = false;
    } else {
      this.toastr.error('Invalid OTP code')
    }
  }
}
