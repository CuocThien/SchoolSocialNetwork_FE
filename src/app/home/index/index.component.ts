import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { keyBy } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { CreatePostComponent } from 'src/app/popup/create-post/create-post.component';
import { CreateRecruitmentNewsComponent } from 'src/app/popup/create-recruitment-news/create-recruitment-news.component';
import { DeleteUserComponent } from 'src/app/popup/delete-user/delete-user.component';
import { SurveyComponent } from 'src/app/popup/survey/survey.component';
import { ChatService, EnterpriseService, FacultyService, HomeIndexService } from 'src/app/services';
import { LIST_CATEGORY_POST, LIST_EXPERIENCE } from 'src/app/utils/constant';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private service: HomeIndexService,
    private facultyService: FacultyService,
    private enterpriseService: EnterpriseService,
    private chatService: ChatService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
  ) {
  }

  listMainTeacherPost = [];
  listMainStudentPost = [];
  listFacultyTeacherPost = [];
  listFacultyStudentPost = [];


  listPostStudy = [];
  listPostUnion = [];
  listPostEnglish = [];
  listPostCommon = [];
  listPostTuition = [];
  listPostScholarship = [];


  isAdmin = false;
  isDean = false;
  isTeacher = false;
  isStudent = false;
  isAlumni = false;
  isCompany = false;

  listFaculty = [];
  faculty: any;
  role: any;

  listCategory = LIST_CATEGORY_POST;

  pageMainStudent = 1;
  pageMainTeacher = 1;
  pageFacultyStudent = 1;
  pageFacultyTeacher = 1;


  pagePostStudy = 1;
  pagePostUnion = 1;
  pagePostEnglish = 1;
  pagePostCommon = 1;
  pagePostTuition = 1;
  pagePostScholarship = 1;


  maxPagePostStudy = 0;
  maxPagePostUnion = 0;
  maxPagePostEnglish = 0;
  maxPagePostCommon = 0;
  maxPagePostTuition = 0;
  maxPagePostScholarship = 0;


  totalMainStudent = 0;
  totalMainTeacher = 0;
  totalFacultyStudent = 0;
  totalFacultyTeacher = 0;

  pageRecruitmentNews = 1;
  maxPageRecruitmentNews = 0;
  listRecruitmentNews = [];
  objExperience = keyBy(LIST_EXPERIENCE, 'id');

  isLangEn = true;

  private modalRef: NgbModalRef;

  async ngOnInit(): Promise<void> {
    const existedListNav = JSON.parse(localStorage.getItem('listNav'))
    let listNavLS = existedListNav ? JSON.parse(localStorage.getItem('listNav'))[0] : null
    listNavLS = listNavLS ? JSON.stringify([listNavLS]) : JSON.stringify([{ "route": "home/index", "nameEn": "Index", "nameVi": "Trang chủ" }])
    localStorage.setItem('listNav', listNavLS)
    if (localStorage.getItem('isSurvey') === 'false') {
      this._survey();
    }
    this.isLangEn = (localStorage.getItem('lang') === 'en') ? true : false;
    this.role = localStorage.getItem('role') || '';
    if (this.role === 'company') {
      this.isCompany = true;
      this._getListNews();
      // this.router.navigate(['home/new-feed']);
      return;
    }
    if (this.role === 'admin') {
      this.isAdmin = true;
      this._getListFaculty();
      await this.getListPostMainGroupForStudent();

      this.getListPostMainGroupForTeacher();
      return;
    }
    this._getListFacultyDean();
    this.isAlumni = localStorage.getItem('isAlumni') === 'true'
  }

  private _survey() {
    this.modalRef = this.modalService.open(SurveyComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.result.then(() => {
    }).catch(() => { });
  }

  ngDoCheck() {
    this.isLangEn = (localStorage.getItem('lang') === 'en') ? true : false;
  }
  getListPostMainGroupFacultyForStudent() {
    this.spinner.show();
    this.service.getListPostMainGroupFacultyForStudent(this.faculty, this.pageFacultyStudent).subscribe({
      next: ((res: any) => {
        this.listFacultyStudentPost = res.data.result || [];
        this.totalFacultyStudent = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        if (this.isAdmin) {
          this.listFacultyStudentPost = this.listFacultyStudentPost.map((itm: any) => {
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
        this.listFacultyTeacherPost = res.data.result || [];
        this.totalFacultyTeacher = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        if (this.isAdmin) {
          this.listFacultyTeacherPost = this.listFacultyTeacherPost.map((itm: any) => {
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
  async getListPostMainGroupForStudent() {
    const observer = {
      next: (val) => {
        [this.listPostStudy, this.maxPagePostStudy] = [val[0].data.result, val[0].data.total ? Math.ceil(val[0].data.total / 10) : 1];
        [this.listPostUnion, this.maxPagePostUnion] = [val[1].data.result, val[1].data.total ? Math.ceil(val[1].data.total / 10) : 1];
        [this.listPostEnglish, this.maxPagePostEnglish] = [val[2].data.result, val[2].data.total ? Math.ceil(val[2].data.total / 10) : 1];
        [this.listPostCommon, this.maxPagePostCommon] = [val[3].data.result, val[3].data.total ? Math.ceil(val[3].data.total / 10) : 1];
        [this.listPostTuition, this.maxPagePostTuition] = [val[4].data.result, val[4].data.total ? Math.ceil(val[4].data.total / 10) : 1];
        [this.listPostScholarship, this.maxPagePostScholarship] = [val[5].data.result, val[5].data.total ? Math.ceil(val[5].data.total / 10) : 1];
        if (this.isAdmin) {
          this.listPostStudy = this.listPostStudy.map((itm: any) => Object.assign(itm, { isRead: false }));
          this.listPostUnion = this.listPostUnion.map((itm: any) => Object.assign(itm, { isRead: false }));
          this.listPostEnglish = this.listPostEnglish.map((itm: any) => Object.assign(itm, { isRead: false }));
          this.listPostCommon = this.listPostCommon.map((itm: any) => Object.assign(itm, { isRead: false }));
          this.listPostTuition = this.listPostTuition.map((itm: any) => Object.assign(itm, { isRead: false }));
          this.listPostScholarship = this.listPostScholarship.map((itm: any) => Object.assign(itm, { isRead: false }));
        }
      },
      error: (err) => console.log(err),
      complete: () => { },
    };
    this.spinner.show();
    forkJoin([
      this._getListPostCategoryStudent(this.pagePostStudy, '62711c4f442b05ae533b8b7a'),
      this._getListPostCategoryStudent(this.pagePostUnion, '62711c71442b05ae533b8c6d'),
      this._getListPostCategoryStudent(this.pagePostEnglish, '62711c84442b05ae533b8cf1'),
      this._getListPostCategoryStudent(this.pagePostCommon, '62711cb8442b05ae533b8e60'),
      this._getListPostCategoryStudent(this.pagePostTuition, '62711d2f442b05ae533b919d'),
      this._getListPostCategoryStudent(this.pagePostScholarship, '62712024442b05ae533ba622')
    ]).subscribe(observer)
  }
  _getListPostCategoryStudent(page: number, categoryId: string) {
    return this.service.getListPostMainGroupForStudent({ page, categoryId })
  }
  goToPageInPostCategory(event: any, categoryId: string) {
    if (categoryId === '62711c4f442b05ae533b8b7a') {
      this.pagePostStudy = event;
      this._getListPostCategoryStudent(this.pagePostStudy, categoryId).subscribe({
        next: (res: any) => {
          this.listPostStudy = res.data.result;
          this.maxPagePostStudy = res.data.total ? Math.ceil(res.data.total / 10) : 1;
          if (this.isAdmin) {
            this.listPostStudy = this.listPostStudy.map((itm: any) => Object.assign(itm, { isRead: false }))
          }
        },
      })
      return;
    }
    if (categoryId === '62711c71442b05ae533b8c6d') {
      this.pagePostUnion = event;
      this._getListPostCategoryStudent(this.pagePostUnion, categoryId).subscribe({
        next: (res: any) => {
          this.listPostUnion = res.data.result;
          this.maxPagePostUnion = res.data.total ? Math.ceil(res.data.total / 10) : 1;
          if (this.isAdmin) {
            this.listPostUnion = this.listPostUnion.map((itm: any) => Object.assign(itm, { isRead: false }))
          }
        },
      })
      return;
    }
    if (categoryId === '62711c84442b05ae533b8cf1') {
      this.pagePostEnglish = event;
      this._getListPostCategoryStudent(this.pagePostEnglish, categoryId).subscribe({
        next: (res: any) => {
          this.listPostEnglish = res.data.result;
          this.maxPagePostEnglish = res.data.total ? Math.ceil(res.data.total / 10) : 1;
          if (this.isAdmin) {
            this.listPostEnglish = this.listPostEnglish.map((itm: any) => Object.assign(itm, { isRead: false }))
          }
        },
      })
      return;
    }
    if (categoryId === '62711cb8442b05ae533b8e60') {
      this.pagePostCommon = event;
      this._getListPostCategoryStudent(this.pagePostCommon, categoryId).subscribe({
        next: (res: any) => {
          this.listPostCommon = res.data.result;
          this.maxPagePostCommon = res.data.total ? Math.ceil(res.data.total / 10) : 1;
          if (this.isAdmin) {
            this.listPostCommon = this.listPostCommon.map((itm: any) => Object.assign(itm, { isRead: false }))
          }
        },
      })
      return;
    }
    if (categoryId === '62711d2f442b05ae533b919d') {
      this.pagePostTuition = event;
      this._getListPostCategoryStudent(this.pagePostTuition, categoryId).subscribe({
        next: (res: any) => {
          this.listPostTuition = res.data.result;
          this.maxPagePostTuition = res.data.total ? Math.ceil(res.data.total / 10) : 1;
          if (this.isAdmin) {
            this.listPostTuition = this.listPostTuition.map((itm: any) => Object.assign(itm, { isRead: false }))
          }
        },
      })
      return;
    }
    if (categoryId === '62712024442b05ae533ba622') {
      this.pagePostScholarship = event;
      this._getListPostCategoryStudent(this.pagePostScholarship, categoryId).subscribe({
        next: (res: any) => {
          this.listPostScholarship = res.data.result;
          this.maxPagePostScholarship = res.data.total ? Math.ceil(res.data.total / 10) : 1;
          if (this.isAdmin) {
            this.listPostScholarship = this.listPostScholarship.map((itm: any) => Object.assign(itm, { isRead: false }))
          }
        },
      })
      return;
    }
  }
  getListPostMainGroupForTeacher() {
    this.spinner.show();
    this.service.getListPostMainGroupForTeacher(this.pageMainTeacher).subscribe({
      next: ((res: any) => {
        this.listMainTeacherPost = res.data.result || [];
        this.totalMainTeacher = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        if (this.isAdmin) {
          this.listMainTeacherPost = this.listMainTeacherPost.map((itm: any) => {
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
    } else if (filter === 'facultyStudent') {
      this.pageFacultyStudent = event;
      this.getListPostMainGroupFacultyForStudent();
    } else {
      this.pageRecruitmentNews = event;
      this._getListNews();
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
        this.listFaculty = res.data.result || [];
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
        this.listFaculty = res.data.result || [];
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
  _getListNews() {
    this.enterpriseService.getListNewsByCompany({ page: this.pageRecruitmentNews }).subscribe({
      next: (res: any) => {
        this.listRecruitmentNews = res.data.result;
        this.maxPageRecruitmentNews = res.data.total ? Math.ceil(res.data.total / 10) : 1
      }
    })
  }
  createNews() {
    this.modalRef = this.modalService.open(CreateRecruitmentNewsComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.result.then((res: any) => {
      this._getListNews();
    }).catch(() => { });
  }
  updateNews(news: any) {
    this.modalRef = this.modalService.open(CreateRecruitmentNewsComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.componentInstance.isUpdate = true;
    this.modalRef.componentInstance.news = news;
    this.modalRef.result.then((res: any) => {
      this._getListNews();
    }).catch(() => { });
  }
  deleteNews(news: any) {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.componentInstance.isNews = true;
    this.modalRef.componentInstance.data = news;
    this.modalRef.result.then((res: any) => {
      this._getListNews();
    }).catch(() => { });
  }
}
