import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../popup/forgot-password/forgot-password.component';
import { LogInService } from '../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class LoginComponent implements OnInit {
  @Output('login') checkLogin = new EventEmitter<boolean>();
  isLogin = false;
  constructor(
    private modalService: NgbModal,
    private service: LogInService,
    private router: Router
  ) { }
  typeOfInputPass = 'password';
  iconShowPass = 'bi-eye';
  isShowPass = false;
  private modalRef: NgbModalRef | undefined;
  ngOnInit(): void {
    if (localStorage.getItem('token'))
      this.router.navigate(['/home'])
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
    this.service.signIn(formSignIn.value);
  }
}
