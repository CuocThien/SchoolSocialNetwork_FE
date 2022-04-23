import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService, PostDetailService, UsersService } from '../../services/index';
import * as XLSX from 'xlsx';
import { map } from 'lodash';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private service: UsersService,
    private postService: PostDetailService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private accountService: AccountService
  ) { }
  isReply = false;
  data: any;
  dataMultiDel = {};
  isPost = false;
  isOutGroup = false;
  isAccount = false;
  isMulti = false;
  isRecoveryAccount = false;
  title = 'POPUP.DELETE_USER'
  ngOnInit(): void {
    if (this.isPost)
      this.title = 'POPUP.DELETE_POST'
    if (this.isOutGroup)
      this.title = 'POPUP.OUT_GROUP'
    if (this.isAccount)
      this.title = 'POPUP.DELETE_ACCOUNT'
    if (this.isRecoveryAccount)
      this.title = 'POPUP.RECOVERY_ACCOUNT'
  }
  onDelete() {
    this.spinner.show();;
    this.spinner.hide();
    if (this.isPost) {
      this.postService.deletePost(this.data.postId).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
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
    if (this.isAccount) {
      if (this.isMulti) {
        const userIds = map(this.dataMultiDel, '_id');
        this.accountService.deleteMultiAccount({
          userIds,
        }).subscribe({
          next: (res: any) => {
            this.toastr.success(res.msg);
            this.activeModal.close(res);
          },
          error: (err: any) => this.toastr.error(err.error.msg)
        })
        return;
      }
      this.accountService.deleteAccount([{ _id: this.data._id }]).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
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
    if (this.isRecoveryAccount) {
      this.accountService.recoveryAccount({ _id: this.data._id }).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
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
    this.service.deleteUser(this.data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.activeModal.close(res);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
  }

  onCancel() {
    this.activeModal.dismiss();
  }
  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workBook = XLSX.read(binaryData, { type: 'binary' })
      this.dataMultiDel = {}
      workBook.SheetNames.forEach(sheet => {
        Object.assign(this.dataMultiDel, XLSX.utils.sheet_to_json(workBook.Sheets[sheet]));
      })
    }
  }
}
