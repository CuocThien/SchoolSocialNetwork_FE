import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UploadImageService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }
  result: any;
  updateImage(value: any) {

    const url = 'https://api.cloudinary.com/v1_1/blogreview/image/upload';
    return this.http.post(url, value)
      .toPromise()
  }
}