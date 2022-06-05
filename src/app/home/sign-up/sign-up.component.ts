import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FacultyService, SignUpService } from '../../services/index';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'lodash'
import { LIST_ROLE } from 'src/app/utils/constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { exportAsExcelFile } from 'src/app/utils/function';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private facultyService: FacultyService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private service: SignUpService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }
  isSingleSignup = false;
  contentButton = 'SIGNUP.SINGLE_SIGNUP'
  signUpForm: FormGroup;
  listFaculty: any;
  faculty = null;
  data = {};
  isLangEn = false

  listRole = LIST_ROLE;
  role = null;

  notiFillForm = '';
  notiAddFile = '';
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en'
    this.translate.get([
      'NOTIFICATION.EMPTY_FORM',
      'NOTIFICATION.EMPTY_EXCEL_FILE',
    ])
      .subscribe(translations => {
        this.notiFillForm = translations['NOTIFICATION.EMPTY_FORM'];
        this.notiAddFile = translations['NOTIFICATION.EMPTY_EXCEL_FILE'];
      });
    this._getListFaculty();
    this.createFormSignUp();
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  _getListFaculty() {
    this.facultyService.getListAllFaculty().subscribe({
      next: (res: any) => {
        this.listFaculty = res.data.result;
      },
      error: (err) => {
        this.toastr.error(err.error.msg)
      }
    })
  }
  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workBook = XLSX.read(binaryData, { type: 'binary' })
      this.data = {}
      workBook.SheetNames.forEach(sheet => {
        Object.assign(this.data, XLSX.utils.sheet_to_json(workBook.Sheets[sheet]));
      })
    }
  }
  onSubmit() {
    if (this.isSingleSignup) {
      if (this.signUpForm.invalid) {
        this.toastr.error(this.notiFillForm)
        return;
      }
      Object.assign(this.data, { 0: this.signUpForm.value })
    }
    if (isEmpty(this.data)) {
      this.toastr.error(this.notiAddFile)
      return;
    }
    this.spinner.show();
    this.service.signup(this.data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.signUpForm.reset();
        exportAsExcelFile(Object.values(res.data.accountData), Object.values(res.data.logs), 'account_signup');
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
    this.data = {}
  }
  createFormSignUp() {
    this.signUpForm = this.formBuilder.group({
      _id: ['', Validators.required],
      fullname: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      year: ['', Validators.required],
      faculty: [null, Validators.required],
      roleId: [null, Validators.required],
    });
  }
  changeButton(event: any) {
    event.preventDefault();
    this.isSingleSignup = !this.isSingleSignup;
    this.contentButton = (this.isSingleSignup) ? 'SIGNUP.MULTIPLE_SIGNUP' : 'SIGNUP.SINGLE_SIGNUP'
  }

}
