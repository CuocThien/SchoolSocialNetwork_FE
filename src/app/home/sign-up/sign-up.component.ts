import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FacultyService, SignUpService } from '../../services/index';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'lodash'
import FileSaver from 'file-saver'
import { LIST_ROLE } from 'src/app/utils/constant';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class SignUpComponent implements OnInit {
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';
  constructor(
    private facultyService: FacultyService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private service: SignUpService,
    private spinner: NgxSpinnerService
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
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en'
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
        this.toastr.error('Please fill information!')
        return;
      }
      Object.assign(this.data, { 0: this.signUpForm.value })
    }
    if (isEmpty(this.data)) {
      this.toastr.error('Please choose an excel file!')
      return;
    }
    this.spinner.show();
    this.service.signup(this.data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.signUpForm.reset();
        this.exportAsExcelFile(Object.values(res.data.accountData), Object.values(res.data.logs), 'account_signup');
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
      role: [null, Validators.required],
    });
  }
  changeButton(event: any) {
    event.preventDefault();
    this.isSingleSignup = !this.isSingleSignup;
    this.contentButton = (this.isSingleSignup) ? 'SIGNUP.MULTIPLE_SIGNUP' : 'SIGNUP.SINGLE_SIGNUP'
  }
  public exportAsExcelFile(data: any[], logs: any[], excelFileName: string): Promise<Object> {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(logs);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet, 'logs': worksheet2 }, SheetNames: ['data', 'logs'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return (this.saveAsExcelFile(excelBuffer, excelFileName));
  }
  private saveAsExcelFile(buffer: any, fileName: string): Promise<Object> {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    return FileSaver.saveAs(data, fileName + this.EXCEL_EXTENSION);
  }
}
