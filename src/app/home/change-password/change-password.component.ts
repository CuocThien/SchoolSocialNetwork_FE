import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from '../../services/index';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private toastr: ToastrService, private service: ChangePasswordService, private router: Router) { }

  isValidNewPassword = true;
  isValidConfirmPassword = true;
  isValidForm = true;
  ngOnInit(): void {
  }
  onSubmit(formChangePassword: any) {
    if (formChangePassword.value.newPassword.length < 6) {
      this.toastr.error("Password must have more than 6 character!")
      this.isValidNewPassword = false;
    }
    else if (formChangePassword.value.newPassword != formChangePassword.value.confirmPassword) {
      this.toastr.error("Please confirm password!")
      this.isValidConfirmPassword = false;
    }
    else if (formChangePassword.invalid) {
      this.toastr.error("Please fill the form!")
      this.isValidConfirmPassword = false;
      this.isValidNewPassword = false;
      this.isValidForm = false;
    }
    else {
      this.service.changePassword(formChangePassword.value).subscribe((res: any) => {
        this.toastr.success(res.msg);
        localStorage.clear();
        this.router.navigate(['/login']);
      }, (err) => {
        this.toastr.error(err.error.msg)
      })
      this.isValidConfirmPassword = true;
      this.isValidNewPassword = true;
      this.isValidForm = true;

    }
  }
}
