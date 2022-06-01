import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EnterpriseService, UploadImageService } from 'src/app/services';
import { LIST_EXPERIENCE } from 'src/app/utils/constant';

@Component({
  selector: 'app-create-recruitment-news',
  templateUrl: './create-recruitment-news.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class CreateRecruitmentNewsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private uploadImageService: UploadImageService,
    private toastr: ToastrService,
    private activeModal: NgbActiveModal,
    private service: EnterpriseService
  ) { }
  createNewsForm: FormGroup;
  imageSrc: any;
  listExperience = LIST_EXPERIENCE;
  isLangEn = false;
  isUpdate = false;
  news: any;
  formTitle: any;
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this.formTitle = !this.isUpdate ? 'BUTTON.CREATE_POST' : 'BUTTON.UPDATE_POST'
    this.createFormCreateNew();
    if (this.isUpdate) this.patchValueForm();
  }
  onSubmit() {
    if (this.createNewsForm.invalid) {
      this.toastr.error('Please fill information!')
      return;
    }
    if (!this.isUpdate) {
      let validData = this.createNewsForm.value;
      if (this.imageSrc)
        validData.poster = this.imageSrc
      this.spinner.show();
      this.service.createRecruitmentNews(validData).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.createNewsForm.reset();
          this.activeModal.close(res);
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        }
      })
      return;
    }
    let validData = this.createNewsForm.value;
    validData._id = this.news._id;
    if (this.imageSrc)
      validData.poster = this.imageSrc
    if (moment(validData.endDate).format() > moment().format()) {
      validData.isExpire = false;
    }
    this.spinner.show();
    this.service.updateRecruitmentNews(validData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.createNewsForm.reset();
        this.activeModal.close(res);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
    return;

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
  onClose() {
    this.activeModal.dismiss();
  }
  createFormCreateNew() {
    this.createNewsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      position: ['', Validators.required],
      quantity: ['', Validators.required],
      location: ['', Validators.required],
      phone: ['', Validators.required],
      salary: ['', Validators.required],
      experience: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  patchValueForm() {
    this.createNewsForm.patchValue({ title: this.news.title });
    this.createNewsForm.patchValue({ description: this.news.description });
    this.createNewsForm.patchValue({ quantity: this.news.quantity });
    this.createNewsForm.patchValue({ position: this.news.position });
    this.createNewsForm.patchValue({ location: this.news.location });
    this.createNewsForm.patchValue({ phone: this.news.phone });
    this.createNewsForm.patchValue({ salary: this.news.salary });
    this.createNewsForm.patchValue({ experience: this.news.experience });
    this.createNewsForm.patchValue({ startDate: moment(this.news.startDate).format('YYYY-MM-DD') });
    this.createNewsForm.patchValue({ endDate: moment(this.news.endDate).format('YYYY-MM-DD') });
    this.imageSrc = this.news.poster;
  }
}
