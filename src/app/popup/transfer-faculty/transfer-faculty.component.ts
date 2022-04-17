import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from 'src/app/services';

@Component({
  selector: 'app-transfer-faculty',
  templateUrl: './transfer-faculty.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class TransferFacultyComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private service: FacultyService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }
  userId: any;
  facultyFrom: any;
  isLangEn = false;
  listFaculty: any;
  groupId: any;
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this.groupId = this.listFaculty[0]._id;
    this.listFaculty = this.listFaculty.filter(itm => itm._id != 'grgv' && itm._id != 'grsv')
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }

  onSubmit() {
    this.spinner.show();
    const reqData = {
      userId: this.userId,
      facultyFrom: this.facultyFrom._id,
      facultyTo: this.groupId
    }
    this.service.transferFaculty(reqData).subscribe({
      next: (res: any) => {
        this.activeModal.close(res)
        this.toastr.success(res.msg);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
