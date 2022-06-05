import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from '../../services/index';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private service: ChangePasswordService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
  ) { }

  isValidNewPassword = true;
  isValidConfirmPassword = true;
  isValidForm = true;

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
    if (formChangePassword.value.newPassword.length < 6) {
      this.toastr.error(this.notiMinLengthPass)
      this.isValidNewPassword = false;
    }
    else if (formChangePassword.value.newPassword != formChangePassword.value.confirmPassword) {
      this.toastr.error(this.notiConfirmPass)
      this.isValidConfirmPassword = false;
    }
    else if (formChangePassword.invalid) {
      this.toastr.error(this.notiFillForm)
      this.isValidConfirmPassword = false;
      this.isValidNewPassword = false;
      this.isValidForm = false;
    }
    else {
      this.spinner.show()
      this.service.changePassword(formChangePassword.value).subscribe({
        next: ((res: any) => {
          this.toastr.success(res.msg);
          localStorage.clear();
          this.router.navigate(['/login']);
          this.spinner.hide();
        }),
        error: ((err) => {
          this.toastr.error(err.error.msg);
          this.spinner.hide();
        })
      })
      this.isValidConfirmPassword = true;
      this.isValidNewPassword = true;
      this.isValidForm = true;

    }
  }
}
