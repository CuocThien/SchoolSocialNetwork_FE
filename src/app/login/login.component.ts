import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../popup/forgot-password/forgot-password.component';
import { LogInService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/sass/main.scss'],
  providers: [LogInService]
})
export class LoginComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private service: LogInService
  ) { }
  typeOfInputPass = 'password';
  iconShowPass = 'bi-eye';
  isShowPass = false;
  private modalRef: NgbModalRef | undefined;
  ngOnInit(): void {
    // this.forgotPass()
  }

  forgotPass() {
    this.modalRef = this.modalService.open(ForgotPasswordComponent, {
      backdrop: 'static',
      centered: true,
    })
    this.modalRef.result.then().catch();
  }
  showPass() {
    this.isShowPass = !this.isShowPass;
    this.typeOfInputPass = (this.isShowPass) ? 'text' : 'password'
    this.iconShowPass = (this.isShowPass) ? 'bi-eye-slash' : 'bi-eye'
  }

  onSubmit(formSignIn: any) {
    this.service.signIn(formSignIn.value).then(res => {
      console.log(res)
    })
      .catch(err => console.log(err));
  }
}
