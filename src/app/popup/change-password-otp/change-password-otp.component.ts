import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from '../../services/index';

@Component({
  selector: 'app-change-password-otp',
  templateUrl: './change-password-otp.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ChangePasswordOtpComponent implements OnInit {

  userId: any;
  isValidNewPassword = true;
  isValidConfirmPassword = true;
  constructor(
    private toastr: ToastrService,
    private service: ChangePasswordService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }
  notiMinLengthPass = '';
  notiConfirmPass = '';
  notiFillForm = '';
  ngOnInit(): void {
    this.translate.get([
      'NOTIFICATION.PASS_MIN_LENGTH',
      'NOTIFICATION.CONFIRM_PASS',
      'NOTIFICATION.EMPTY_FORM',
    ])
      .subscribe(translations => {
        this.notiMinLengthPass = translations['NOTIFICATION.PASS_MIN_LENGTH'];
        this.notiConfirmPass = translations['NOTIFICATION.CONFIRM_PASS'];
        this.notiFillForm = translations['NOTIFICATION.EMPTY_FORM'];
      });
  }
  onSubmit(formChangePassword: any) {
    if (formChangePassword.value.password.length < 6) {
      this.toastr.error(this.notiMinLengthPass)
      this.isValidNewPassword = false;
    }
    else if (formChangePassword.value.password != formChangePassword.value.confirmPassword) {
      this.toastr.error(this.notiConfirmPass)
      this.isValidConfirmPassword = false;
    }
    else {
      this.spinner.show();
      formChangePassword.value.userId = this.userId;
      this.service.resetPassword(formChangePassword.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.msg);
          this.router.navigate(['/login']);
          this.activeModal.close();
          this.spinner.hide();
        },
        error: (err) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        }
      })
      this.isValidConfirmPassword = true;
      this.isValidNewPassword = true;

    }
  }
  onClose() {
    this.activeModal.close();
  }
}
