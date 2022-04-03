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
  ngOnInit(): void {
    this._getListFaculty();
  }
  private _getListFaculty() {
    this.service.getListAllFaculty().subscribe({
      next: ((res: any) => {
        this.listFaculty = res.data;
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
