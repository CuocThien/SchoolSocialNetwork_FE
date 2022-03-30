import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeIndexService } from '../../services/index';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private homeService: HomeIndexService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,

  ) { }
  // signUpForm: FormGroup;
  listFaculty: any;
  faculty = null;
  listRole = [
    { role: 'admin', name: 'Admin' },
    { role: 'dean', name: 'Dean' },
    { role: 'teacher', name: 'Teacher' },
    { role: 'student', name: 'Student' },
  ];
  role = null;
  ngOnInit(): void {
    this._getListFaculty();
  }
  _getListFaculty() {
    this.homeService.getListFaculty().subscribe(
      (res: any) => {
        this.listFaculty = res.data;
      },
      (err) => {
        this.toastr.error(err.error.msg)
      })
  }
  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workBook = XLSX.read(binaryData, { type: 'binary' })
      let data = {}
      workBook.SheetNames.forEach(sheet => {
        Object.assign(data, XLSX.utils.sheet_to_json(workBook.Sheets[sheet]));
      })
      console.log("💁 => SignUpComponent => fileReader", data)
    }
  }
  onSubmit(value: any) {
    console.log("💁 => SignUpComponent => value", value.value)

  }

}
