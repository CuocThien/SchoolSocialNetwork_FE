import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from "ngx-image-cropper";
import { ToastrService } from 'ngx-toastr';
import { UploadImageService } from 'src/app/services';

@Component({
  selector: 'app-crop-image-group',
  templateUrl: './crop-image-group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class CropImageGroupComponent implements OnInit {

  constructor(
    private service: UploadImageService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) { }
  imgChangeEvt: any = "";
  cropImgPreview: any = "";
  imgUrl: any;
  fileImg: any;

  ngOnInit(): void {
  }
  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }
  cropImg(e: ImageCroppedEvent) {
    this.imgUrl = e.base64;
    this.fileImg = e.base64;
  }

  onUpload() {
    const data = new FormData();
    data.append('file', this.fileImg);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'blogreview')
    this.service.updateImage(data)
      .then((res: any) => {
        this.imgUrl = res.url;
        this.activeModal.close(res);
      })
      .catch((err: any) => {
        this.toastr.error(err.error.msg)
      })
  }
  onCancel() {
    this.activeModal.dismiss();
  }
  // imgLoad() {
  //   // display cropper tool
  // }

  // initCropper() {
  //   // init cropper
  // }

  // imgFailed() {
  //   // error msg
  // }
}
