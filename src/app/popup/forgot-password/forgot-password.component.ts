import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LogInService } from 'src/app/services';
import { ChangePasswordOtpComponent } from '../change-password-otp/change-password-otp.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private modalRef: NgbModalRef | undefined;

  constructor(private activeModal: NgbActiveModal, private service: LogInService, private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  timeOut = 180;
  isRequested = false;
  timeOutClock = '';
  isResendShow = false;
  intervalId: any;
  userId = ''
  OTPCode = ''
  OTP = ''
  ngOnInit(): void {
  }
  onClose() {
    this.activeModal.close();
    window.clearInterval(this.intervalId);
  }

  resend() {
    this.isResendShow = false;
    this.timeOut = 120;
    this.requestOPT();
    this.request()
  }

  request() {
    if (!this.isRequested) { this.isRequested = !this.isRequested }
    this.intervalId = setInterval(() => {
      --this.timeOut;
      var minute = Math.floor(this.timeOut / 60);
      var seconds: number = Number(this.timeOut - minute * 60);
      var minuteStr = (minute < 10) ? `0${minute}` : minute;
      var secondsStr = (seconds < 10) ? `0${seconds}` : seconds;
      this.timeOutClock = `The OPT will be expires in ${minuteStr}:${secondsStr}`
      if (this.timeOut < 0) {
        clearInterval(this.intervalId);
        this.timeOutClock = "EXPIRED";
        this.isResendShow = true;
        this.OTPCode = ''
      }
    }, 1000)
  }

  requestOPT() {
    if (this.userId == '') {
      this.toastr.error('Please input username to requets OTP')
      return;
    }
    const data = {
      _id: this.userId
    }
    this.service.forgotPassword(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.OTPCode = res.data.content.substring(0, 6);
        this.request()
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
  }
  onConfirm() {
    if (this.OTP == this.OTPCode && this.OTPCode != '') {
      this.activeModal.close();
      window.clearInterval(this.intervalId);
      this.modalRef = this.modalService.open(ChangePasswordOtpComponent, {
        backdrop: 'static',
        centered: true,
      })
      this.modalRef.componentInstance.userId = this.userId;
      this.modalRef.result.then().catch();
    } else {
      this.toastr.error('Invalid OTP code')

    }
  }
}
