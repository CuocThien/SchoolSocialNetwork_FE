import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreatePostComponent } from 'src/app/popup/create-post/create-post.component';
import { FacultyService, HomeIndexService } from 'src/app/services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private service: HomeIndexService,
    private facultyService: FacultyService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
  ) {
  }

  listMainTeacherPost: any;
  listMainStudentPost: any;
  listFacultyTeacherPost: any;
  listFacultyStudentPost: any;

  isAdmin = false;
  isDean = false;
  isTeacher = false;
  isStudent = false;
  isAlumni = false;

  listFaculty: any;
  faculty: any;
  role: any;

  pageMainStudent = 1;
  pageMainTeacher = 1;
  pageFacultyStudent = 1;
  pageFacultyTeacher = 1;

  totalMainStudent = 0;
  totalMainTeacher = 0;
  totalFacultyStudent = 0;
  totalFacultyTeacher = 0;

  isLangEn = true;

  private modalRef: NgbModalRef;

  ngOnInit(): void {
    this.isLangEn = (localStorage.getItem('lang') === 'en') ? true : false;
    this.isAlumni = localStorage.getItem('isAlumni') === 'true'
    this.role = localStorage.getItem('role') || '';
    if (this.role === 'admin') {
      this._getListFaculty();
      this.getListPostMainGroupForStudent();
      this.getListPostMainGroupForTeacher();
      this.isAdmin = true;
      return;
    }
    this._getListFacultyDean();
  }
  ngDoCheck() {
    this.isLangEn = (localStorage.getItem('lang') === 'en') ? true : false;
  }
  getListPostMainGroupFacultyForStudent() {
    this.spinner.show();
    this.service.getListPostMainGroupFacultyForStudent(this.faculty, this.pageFacultyStudent).subscribe({
      next: ((res: any) => {
        this.listFacultyStudentPost = res.data.result;
        this.totalFacultyStudent = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        if (this.isAdmin) {
          this.listFacultyStudentPost.map((itm: any) => {
            return {
              ...itm,
              isRead: false
            }
          })
        }
        this.spinner.hide();
      }),
      error: ((err) => {
        this.spinner.hide();
      })
    })
  }

  getListPostMainGroupFacultyForTeacher() {
    this.spinner.show();
    this.service.getListPostMainGroupFacultyForTeacher(this.faculty, this.pageFacultyTeacher).subscribe({
      next: ((res: any) => {
        this.listFacultyTeacherPost = res.data.result;
        this.totalFacultyTeacher = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        if (this.isAdmin) {
          this.listFacultyTeacherPost.map((itm: any) => {
            return {
              ...itm,
              isRead: false
            }
          })
        }
        this.spinner.hide()
      }),
      error: ((err) => {
        this.spinner.hide();
      })
    })
  }
  getListPostMainGroupForStudent() {
    this.spinner.show()
    this.service.getListPostMainGroupForStudent(this.pageMainStudent).subscribe({
      next: ((res: any) => {
        this.listMainStudentPost = res.data.result;
        this.totalMainStudent = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        if (this.isAdmin) {
          this.listMainStudentPost.map((itm: any) => {
            return {
              ...itm,
              isRead: false
            }
          })
        }
        this.spinner.hide();
      }),
      error: ((err) => {
        this.spinner.hide();
      })
    })
  }
  getListPostMainGroupForTeacher() {
    this.spinner.show();
    this.service.getListPostMainGroupForTeacher(this.pageMainTeacher).subscribe({
      next: ((res: any) => {
        this.listMainTeacherPost = res.data.result;
        this.totalMainTeacher = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        if (this.isAdmin) {
          this.listMainTeacherPost.map((itm: any) => {
            return {
              ...itm,
              isRead: false
            }
          })
        }
        this.spinner.hide();
      }),
      error: ((err) => {
        this.spinner.hide();
      })
    })
  }

  goToPage(filter: any, event: any) {
    if (filter === 'mainTeacher') {
      this.pageMainTeacher = event;
      this.getListPostMainGroupForTeacher();
    } else if (filter === 'mainStudent') {
      this.pageMainStudent = event;
      this.getListPostMainGroupForStudent();
    } else if (filter === 'facultyTeacher') {
      this.pageFacultyTeacher = event;
      this.getListPostMainGroupFacultyForTeacher();
    } else {
      this.pageFacultyStudent = event;
      this.getListPostMainGroupFacultyForStudent();
    }
  }
  goToDetailPost(postId: any) {
    this.router.navigate([`/home/post/${postId}`])
  }
  createPost(groupId: any, isMainGroup: any, isStudent: any) {
    this.modalRef = this.modalService.open(CreatePostComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.componentInstance.groupId = groupId;
    this.modalRef.componentInstance.isMainGroup = isMainGroup;
    this.modalRef.componentInstance.isStudent = isStudent;
    this.modalRef.result.then((res: any) => {
      if (groupId === 'grsv') {
        this.getListPostMainGroupForStudent();
      } else if (groupId === 'grgv') {
        this.getListPostMainGroupForTeacher();
      } else {
        if (isStudent) {
          this.getListPostMainGroupFacultyForStudent();
        } else {
          this.getListPostMainGroupFacultyForTeacher();
        }
      }
    }).catch(() => { });
  }
  _getListFacultyDean() {
    this.facultyService.getFacultyByDean().subscribe({
      next: ((res: any) => {
        this.listFaculty = res.data.result;
        this.faculty = this.listFaculty[0]._id || '';
        if (this.role === 'dean') {
          this.getListPostMainGroupFacultyForStudent();
          this.getListPostMainGroupFacultyForTeacher();
          this.getListPostMainGroupForTeacher();
          this.isDean = true;
        } else if (this.role === 'teacher') {
          this.getListPostMainGroupFacultyForTeacher();
          this.getListPostMainGroupForTeacher();
          this.isTeacher = true;
        } else {
          this.getListPostMainGroupFacultyForStudent();
          this.getListPostMainGroupForStudent();
          this.isStudent = true;
        }
      }),
      error: ((err) => {
        this.toastr.error(err.error.msg)
      })
    })
  }
  _getListFaculty() {
    this.facultyService.getListAllFaculty().subscribe({
      next: ((res: any) => {
        this.listFaculty = res.data.result;
        this.faculty = this.listFaculty[0]._id || '';
        this.getListPostMainGroupFacultyForStudent();
        this.getListPostMainGroupFacultyForTeacher();
      }),
      error: ((err) => {
        this.toastr.error(err.error.msg)
      })
    })
  }
  filterFaculty() {
    this.getListPostMainGroupFacultyForStudent();
    this.getListPostMainGroupFacultyForTeacher();
  }
  readPost(notifyId: any) {
    if (!this.isAdmin && !this.isDean) {
      this.service.readPost(notifyId).subscribe()
    }
  }
}
