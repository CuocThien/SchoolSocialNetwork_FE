import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PostDetailService } from 'src/app/services';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class PostDetailComponent implements OnInit {

  post: any;
  postId = '';
  constructor(
    private route: ActivatedRoute,
    private service: PostDetailService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.postId = this.route.snapshot.paramMap.get("id") || '';
    this._getPostDetail();
  }
  backToTop() {
    window.scrollTo(0, 0)
  }
  _getPostDetail() {
    this.spinner.show();
    this.service.getPostDetail(this.postId).subscribe({
      next: ((res: any) => {
        this.post = res.data;
        this.spinner.hide();
      }),
      error: ((err: any) => {
        this.toastr.error(err.error.msg);
        this.router.navigate(['**'])
        this.spinner.hide();
      })
    })
  }
}
