import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    private toastr: ToastrService

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
    const reqData = {
      userId: this.userId,
      facultyFrom: this.facultyFrom._id,
      facultyTo: this.groupId
    }
    this.service.transferFaculty(reqData).subscribe({
      next: (res: any) => {
        this.activeModal.close(res)
        this.toastr.success(res.msg);
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
