import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  timeOut = 120;
  isRequested = false;
  timeOutClock = '';
  isResendShow = false;
  intervalId: any;
  ngOnInit(): void {
  }
  onClose() {
    this.activeModal.close();
    // window.clearInterval(this.intervalId);

  }

  resend() {
    this.isResendShow = false;
    this.timeOut = 120;
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
      }
    }, 1000)
  }

  requestOPT(data: any) {

  }
}
