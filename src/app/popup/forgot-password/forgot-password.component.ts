import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LogInService } from 'src/app/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal, private service: LogInService, private toastr: ToastrService) { }

  timeOut = 180;
  isRequested = false;
  timeOutClock = '';
  isResendShow = false;
  intervalId: any;
  userId = ''
  OTPCode = ''
  ngOnInit(): void {
  }
  onClose() {
    this.activeModal.close();
    // window.clearInterval(this.intervalId);

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
    this.service.forgotPassword(data).subscribe(
      (res: any) => {
        console.log("💁 ~ file: forgot-password.component.ts ~ line 62 ~ ForgotPasswordComponent ~ requestOPT ~ res", res)
        this.toastr.success(res.msg);
        this.OTPCode = res.data.content.substring(0, 6);
        this.request()
      },
      (err: any) => {
        console.log("💁 ~ file: forgot-password.component.ts ~ line 58 ~ ForgotPasswordComponent ~ requestOPT ~ err", err)
        this.toastr.error(err.error.msg)
      })
  }
}
