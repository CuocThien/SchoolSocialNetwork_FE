import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private toastr: ToastrService, private service: ChangePasswordService, private router: Router,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  onSubmit(formChangePassword: any) {
    if (formChangePassword.value.password.length < 6) {
      this.toastr.error("Password must have more than 6 character!")
      this.isValidNewPassword = false;
    }
    else if (formChangePassword.value.password != formChangePassword.value.confirmPassword) {
      this.toastr.error("Please confirm password!")
      this.isValidConfirmPassword = false;
    }
    else {
      formChangePassword.value.userId = this.userId;
      this.service.resetPassword(formChangePassword.value).subscribe((res: any) => {
        this.toastr.success(res.msg);
        this.router.navigate(['/login']);
        this.activeModal.close();

      }, (err) => {
        this.toastr.error(err.error.msg)
      })
      this.isValidConfirmPassword = true;
      this.isValidNewPassword = true;

    }
  }
  onClose() {
    this.activeModal.close();
  }
}
