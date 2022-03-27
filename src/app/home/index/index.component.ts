import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeIndexService } from 'src/app/services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private service: HomeIndexService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  listMainTeacherPost: any;
  listMainStudentPost: any;
  listFacultyTeacherPost: any;
  listFacultyStudentPost: any;

  isAdmin = false;
  isDean = false;
  isTeacher = false;
  isStudent = false;

  faculty = 'fhq';
  role: any;

  pageMainStudent = 1;
  pageMainTeacher = 1;
  pageFacultyStudent = 1;
  pageFacultyTeacher = 1;

  totalMainStudent = 0;
  totalMainTeacher = 0;
  totalFacultyStudent = 0;
  totalFacultyTeacher = 0;


  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
    if (this.role === 'admin') {
      this.getListPostMainGroupFacultyForStudent();
      this.getListPostMainGroupFacultyForTeacher();
      this.getListPostMainGroupForStudent();
      this.getListPostMainGroupForTeacher();
      this.isAdmin = true;
    } else if (this.role === 'dean') {
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
  }



  getListPostMainGroupFacultyForStudent() {
    this.service.getListPostMainGroupFacultyForStudent(this.faculty, this.pageFacultyStudent).subscribe(
      (res: any) => {
        this.listFacultyStudentPost = res.data.result;
        this.totalFacultyStudent = Math.ceil(res.data.total / 10);
      },
      (err) => {
        this.toastr.error(err.error.msg)
      })
  }

  getListPostMainGroupFacultyForTeacher() {
    this.service.getListPostMainGroupFacultyForTeacher(this.faculty, this.pageFacultyTeacher).subscribe(
      (res: any) => {
        this.listFacultyTeacherPost = res.data.result;
        this.totalFacultyTeacher = Math.ceil(res.data.total / 10);
      },
      (err) => {
        this.toastr.error(err.error.msg)
      })
  }
  getListPostMainGroupForStudent() {
    this.service.getListPostMainGroupForStudent(this.pageMainStudent).subscribe(
      (res: any) => {
        this.listMainStudentPost = res.data.result;
        this.totalMainStudent = Math.ceil(res.data.total / 10);
      },
      (err) => {
        this.toastr.error(err.error.msg)
      })
  }
  getListPostMainGroupForTeacher() {
    this.service.getListPostMainGroupForTeacher(this.pageMainTeacher).subscribe(
      (res: any) => {
        this.listMainTeacherPost = res.data.result;
        this.totalMainTeacher = Math.ceil(res.data.total / 10);
      },
      (err) => {
        this.toastr.error(err.error.msg)
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
}
