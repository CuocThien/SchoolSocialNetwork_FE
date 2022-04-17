import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { CategoryService, GroupService, PostDetailService } from 'src/app/services';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ReportComponent implements OnInit {

  constructor(
    private service: CategoryService,
    private groupService: GroupService,
    private postService: PostDetailService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }
  listReport: any;
  isLangEn = true;
  type: any;
  id: any;
  reportId = ''
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this._getListReport()
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en';
  }
  onSubmit() {
    if (this.reportId == '') {
      this.toastr.error('Please choose category of report')
    }
    this.spinner.show();
    if (this.type == 'group') {
      this.groupService.report({
        groupId: this.id,
        reportId: this.reportId
      }).subscribe({
        next: (res: any) => {
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
    this.postService.report({
      postId: this.id,
      reportId: this.reportId
    }).subscribe({
      next: (res: any) => {
        this.activeModal.close(res);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
  }
  private _getListReport() {
    this.listReport = this.service.getListCategory({
      type: 'report'
    }).pipe(map((res: any) => res.data))
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
