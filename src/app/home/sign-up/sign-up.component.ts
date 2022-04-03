import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FacultyService, SignUpService } from '../../services/index';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'lodash'


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
    private service: SignUpService
  ) { }
  isSingleSignup = false;
  contentButton = 'SIGNUP.SINGLE_SIGNUP'
  signUpForm: FormGroup;
  listFaculty: any;
  faculty = null;
  data = {};
  listRole = [
    { role: 'admin', name: 'Admin' },
    { role: 'dean', name: 'Dean' },
    { role: 'teacher', name: 'Teacher' },
    { role: 'student', name: 'Student' },
  ];
  role = null;
  ngOnInit(): void {
    this._getListFaculty();
    this.createFormSignUp();
  }
  _getListFaculty() {
    this.facultyService.getListFaculty().subscribe({
      next: (res: any) => {
        this.listFaculty = res.data;
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
        this.toastr.error('Please fill information!')
        return;
      }
      Object.assign(this.data, { 0: this.signUpForm.value })
    }
    if (isEmpty(this.data)) {
      this.toastr.error('Please choose an excel file!')
      return;
    }

    this.service.signup(this.data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.signUpForm.reset();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
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
      role: [null, Validators.required],
    });
  }
  changeButton(event: any) {
    event.preventDefault();
    this.isSingleSignup = !this.isSingleSignup;
    this.contentButton = (this.isSingleSignup) ? 'SIGNUP.MULTIPLE_SIGNUP' : 'SIGNUP.SINGLE_SIGNUP'
  }

}
