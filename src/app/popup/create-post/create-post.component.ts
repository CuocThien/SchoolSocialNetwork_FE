import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    private activeModal: NgbActiveModal
  ) { }
  ckeConfig: any;
  content: any;
  groupId = '';
  isMainGroup = false;
  isUpdate = false;
  isStudent = false;
  postId: any;
  ngOnInit(): void {
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
      this.toastr.error("Please input the title of post")
    } else if (form.value.content == "") {
      this.toastr.error("Please input content of post")
    } else {
      if (this.isUpdate) {
        this.data._id = this.postId;
        this.createPostService.updatePost(this.data).subscribe({
          next: (res: any) => {
            this.toastr.success(res.msg);
            this.activeModal.close(res);
          },
          error: (err: any) => {
            this.toastr.error(err.error.msg)
          }
        });
        return;
      }
      this.createPostService.createPost(this.data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.activeModal.close(res);
        },
        error: (err: any) => {
          this.toastr.error(err.error.msg)
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
