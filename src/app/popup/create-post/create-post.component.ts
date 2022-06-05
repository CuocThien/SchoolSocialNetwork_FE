import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LIST_CATEGORY_POST } from 'src/app/utils/constant';
import { CreatePostService } from '../../services/index';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private createPostService: CreatePostService,
    private activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }
  ckeConfig: any;
  content: any;
  groupId = '';
  isMainGroup = false;
  isUpdate = false;
  isStudent = false;
  postId: any;
  title = 'BUTTON.CREATE_POST';
  isLangEn = false;
  categoryId = '';
  listCategory = LIST_CATEGORY_POST;

  notiEmptyTitle = '';
  notiEmptyContent = '';
  ngOnInit(): void {
    this.translate.get([
      'NOTIFICATION.EMPTY_POST_TITLE',
      'NOTIFICATION.EMPTY_POST_CONTENT',
    ])
      .subscribe(translations => {
        this.notiEmptyTitle = translations['NOTIFICATION.EMPTY_POST_TITLE'];
        this.notiEmptyContent = translations['NOTIFICATION.EMPTY_POST_CONTENT'];
      });
    this.isLangEn = localStorage.getItem('lang') === 'en'
    if (this.isUpdate)
      this.title = 'BUTTON.UPDATE_POST'
    this.ckeConfig = {
      extraPlugins: ['uploadimage'],
      filebrowserImageUploadUrl:
        'https://oggy-webreview.herokuapp.com/image/upload',
      width: '100%',
      height: '500px',
    };
  }
  data: any;
  onSubmit(form: any) {
    this.data = form.value;
    this.data.groupId = this.groupId;
    this.data.isMainGroup = this.isMainGroup;
    if (this.isMainGroup)
      this.data.isStudent = this.isStudent;
    if (form.value.title == "" && this.isMainGroup) {
      this.toastr.error(this.notiEmptyTitle)
    } else if (form.value.content == "") {
      this.toastr.error(this.notiEmptyContent)
    } else {
      this.spinner.show();
      if (this.isUpdate) {
        this.data._id = this.postId;
        this.createPostService.updatePost(this.data).subscribe({
          next: (res: any) => {
            this.toastr.success(res.msg);
            this.activeModal.close(res);
            this.spinner.hide();
          },
          error: (err: any) => {
            this.toastr.error(err.error.msg);
            this.spinner.hide();
          }
        });
        return;
      }
      this.createPostService.createPost(this.data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res);
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        }
      });
    }

  }
  isOverMaxLength: boolean = false;
  checkLength(event: any) {
    if (event.length >= 100) {
      this.isOverMaxLength = true;
    } else {
      this.isOverMaxLength = false;
    }
  }
  isOverMaxLengthOverview: boolean = false;
  checkLengthOverview(event: any) {
    if (event.length >= 300) {
      this.isOverMaxLengthOverview = true;
    } else {
      this.isOverMaxLengthOverview = false;
    }
  }
  onClose() {
    this.activeModal.dismiss();
  }
}
