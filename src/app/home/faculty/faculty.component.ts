import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  ) { }
  private modalRef: NgbModalRef;

  listFaculty: any;
  page = 1;
  maxPage = 1;
  ngOnInit(): void {
    this._getListFaculty();
  }
  private _getListFaculty() {
    this.service.getListFaculty({ page: this.page }).subscribe({
      next: ((res: any) => {
        console.log("🐼 => FacultyComponent => res", res)
        this.listFaculty = res.data.result;
        this.maxPage = Math.ceil((res.data.total - 2) / 10)
      }),
      error: ((err: any) => {
        this.toastr.error(err.error.msg)
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
      this.listFaculty.push(res)
    }).catch((err: any) => {
      // console.log("💁 => FacultyComponent => err", err)
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
      // console.log("💁 => FacultyComponent => err", err)

    });
  }

}
