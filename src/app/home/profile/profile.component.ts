import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService, UploadImageService } from '../../services/index';
import * as moment from 'moment'

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
  constructor(private service: ProfileService, private uploadImageService: UploadImageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
    this.dob = moment(this.profile.dob).format('YYYY-MM-DD')
    this.imageSrc = this.profile.avatar
  }
  ngAfterViewInit() {
    // this.spinner.hide();
  }
  onSubmit(formUpdateProfile: any) {
    this.data = formUpdateProfile.value;
    this.data["avatar"] = this.imageSrc;
    this.service.updateUser(this.data).subscribe(
      (res: any) => {
        this.toastr.success(res.msg);
        this.service.getProfile().subscribe((res: any) => {
          localStorage.setItem('profile', JSON.stringify(res.data))
          this.profile = JSON.parse(localStorage.getItem('profile') || '')
          this.dob = moment(this.profile.dob).format('YYYY-MM-DD')
          this.imageSrc = this.profile.avatar
        }, (err) => { console.log(err) })

      },
      (err: any) => {
        this.toastr.error(err.error.msg)
      });
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'angular_cloudinary');
      data.append('cloud_name', 'blogreview')
      this.uploadImageService.updateImage(data)
        .then(res => {
          this.result = res;
          this.imageSrc = this.result.url;
        })
        .catch(err => {
          this.toastr.error(err.error.msg)
        })
    }
  }

}
