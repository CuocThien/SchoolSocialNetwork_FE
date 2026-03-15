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
    this.initializeDragAndDrop();
  }

  initializeDragAndDrop() {
    const dropArea = document.getElementById('file-drag');

    if (dropArea) {
      // Prevent default drag behaviors
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      });

      // Highlight drop area when item is dragged over it
      ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
          dropArea.classList.add('drag-over');
        }, false);
      });

      // Remove highlight when item is dropped or leaves
      ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
          dropArea.classList.remove('drag-over');
        }, false);
      });

      // Handle dropped files
      dropArea.addEventListener('drop', (e: any) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
          const fileInput = document.getElementById('file-upload') as HTMLInputElement;
          if (fileInput) {
            fileInput.files = files;
            // Trigger change event
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
          }
        }
      }, false);
    }
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

    if (!selectedFile) return;

    // Validate file type
    const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const fileName = selectedFile.name.toLowerCase();
    const isValidType = validTypes.includes(selectedFile.type) || fileName.endsWith('.xls') || fileName.endsWith('.xlsx');

    if (!isValidType) {
      this.toastr.error('Please upload a valid Excel file (.xls or .xlsx)');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      this.toastr.error('File size must be less than 5MB');
      return;
    }

    // Update UI to show selected file
    this.updateFileUploadUI(selectedFile.name);

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workBook = XLSX.read(binaryData, { type: 'binary' })
      this.data = {}
      workBook.SheetNames.forEach(sheet => {
        Object.assign(this.data, XLSX.utils.sheet_to_json(workBook.Sheets[sheet]));
      })

      // Show success message
      this.toastr.success(`File "${selectedFile.name}" loaded successfully`);
    }
  }

  updateFileUploadUI(fileName: string) {
    const uploadText = document.querySelector('.signup-page__upload-text');
    const uploadHint = document.querySelector('.signup-page__upload-hint');
    const uploadIcon = document.querySelector('.signup-page__upload-icon');
    const uploadArea = document.querySelector('.signup-page__upload-area');

    if (uploadText) {
      uploadText.textContent = 'File selected: ' + fileName;
      uploadText.classList.add('file-selected');
    }

    if (uploadHint) {
      uploadHint.textContent = 'Click or drag to replace file';
    }

    if (uploadIcon) {
      uploadIcon.classList.remove('bi-cloud-arrow-up');
      uploadIcon.classList.add('bi-file-earmark-excel');
    }

    if (uploadArea) {
      uploadArea.classList.add('has-file');
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
