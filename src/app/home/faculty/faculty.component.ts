import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ChangeAdminComponent } from 'src/app/popup/change-admin/change-admin.component';
import { CreateFacultyComponent } from 'src/app/popup/create-faculty/create-faculty.component';
import { FacultyService } from '../../services/index';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class FacultyComponent implements OnInit {

  constructor(
    private service: FacultyService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }
  private modalRef: NgbModalRef;

  listFaculty: any;
  page = 1;
  maxPage = 1;
  ngOnInit(): void {
    this._getListFaculty();
  }
  private _getListFaculty() {
    this.spinner.show();
    this.service.getListFaculty({ page: this.page }).subscribe({
      next: ((res: any) => {
        this.listFaculty = res.data.result;
        this.maxPage = (res.data.total - 2) ? Math.ceil((res.data.total - 2) / 10) : 1;
        this.spinner.hide();
      }),
      error: ((err: any) => {
        this.spinner.hide();
      })
    })
  }
  createFaculty() {
    this.modalRef = this.modalService.open(CreateFacultyComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.result.then((res: any) => {
      let data = res;
      res.profile = {}
      this.listFaculty.push(data)
    }).catch((err: any) => {
    });
  }
  editFaculty(faculty: any, index: any) {
    this.modalRef = this.modalService.open(CreateFacultyComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.componentInstance.faculty = faculty
    this.modalRef.result.then((res: any) => {
      this.listFaculty[index] = res;
    }).catch((err: any) => {

    });
  }
  tranferDean(faculty: any, index: any) {
    this.modalRef = this.modalService.open(ChangeAdminComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.componentInstance.faculty = faculty
    this.modalRef.result.then((res: any) => {
      this.listFaculty[index].profile = res.data;
    }).catch((err: any) => {

    });
  }

}
