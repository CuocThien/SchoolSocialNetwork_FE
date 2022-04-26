import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { TranslateService } from '@ngx-translate/core';
import { HomeIndexService } from '../services/index';
import { HOST } from '../utils/constant';
import { EVENT_NOTIFICATION_SSC } from '../socket-event/server/notification';
import { EVENT_NOTIFICATION_CSS } from '../socket-event/client/notification';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../assets/sass/main.scss'],
  providers: [HomeIndexService]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private translate: TranslateService,
    private service: HomeIndexService,
    private toastr: ToastrService
  ) {
    //CONNECT SOCKET NOTIFICATION
    this.socket = io.io(`${HOST}`);
    this.socket.on(EVENT_NOTIFICATION_SSC.JOIN_ROOM_SSC, (data: any) => {
      //console.log(data)
    });
    this.socket.on(EVENT_NOTIFICATION_SSC.SEND_NOTIFICATION_SSC, (payload: any) => {
      const { data } = payload || {};
      this.toastr.info(`
        <div class="card-user-toastr__avatar mt-3 mb-3 col-3">
          <img src="${data.avatar}">
        </div>
        <div class="card-user-toastr__info col-9">
          ${this.isLangEn ? data.contentEn : data.contentVi}
        </div>
    `, '', {
        enableHtml: true,
        timeOut: 1800,
        progressBar: true,
        progressAnimation: "decreasing",
        messageClass: 'card-user-toastr'
      });
      this._getNotification();
    });
    this.socket.on(EVENT_NOTIFICATION_SSC.LEAVE_ROOM_SSC, (data: any) => {
      //console.log(data)
    });
  }
  socket: any;

  lang = 'HEADER.ENGLISH'
  profile: any;
  page = 1;
  listNotification = [];
  isEndListNotification = false;
  isLangEn = false;
  searchString = ''

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  isCheck = false;

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
    this.socket.emit(EVENT_NOTIFICATION_CSS.JOIN_ROOM_CSS, { _id: this.profile._id })

    const language = localStorage.getItem('lang') || 'en';
    if (language === 'en') {
      this.lang = 'HEADER.ENGLISH';
      localStorage.setItem('lang', 'en');
    } else {
      this.lang = 'HEADER.VIETNAMESE';
      localStorage.setItem('lang', 'vi')
    }
    this.translate.use(language);
    this.isLangEn = localStorage.getItem('lang') === 'en'
    this._getNotification();
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  ngAfterViewChecked() {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
  }

  ngOnDestroy() {
    this.socket.emit(EVENT_NOTIFICATION_CSS.LEAVE_ROOM_CSS, {
      _id: this.profile._id
    });
  }

  logout() {
    this.router.navigate(['/'])
    const lang = localStorage.getItem('lang');
    localStorage.clear();
    localStorage.setItem('lang', lang);
  }
  selectLang(value: any) {
    if (value === 'en') {
      this.lang = 'HEADER.ENGLISH';
      localStorage.setItem('lang', value);
    } else {
      this.lang = 'HEADER.VIETNAMESE';
      localStorage.setItem('lang', value)
    }
    this.translate.use(value)
  }
  private _getNotification() {
    this.service.getNotification(this.page).subscribe({
      next: (res: any) => {
        if (!res.data.length) {
          this.isEndListNotification = true;
          return;
        }
        this.listNotification.push(...res.data)
      },
      error: (err: any) => { }//console.log(err)
    })
  }
  onEnd(event: any) {
    this.page++;
    if (this.isEndListNotification) return;
    this._getNotification();
  }
  readNotification(notifyId: any, index: any) {
    this.service.readNotification(notifyId).subscribe((res: any) => {
      this.router.navigate([`/home/post/${res.data.postId}`])
      this.listNotification[index].isRead = true;
    })
  }
  openNoti(event: any) {
    event.preventDefault();
    this.isCheck = !this.isCheck;

  }
  readAllNotification() {
    this.service.readAllNotification().subscribe(() => {
      this.listNotification = this.listNotification.map(itm => {
        return {
          ...itm,
          isRead: true
        }
      })
    })
    this.isCheck = true;
  }
  onSubmit() {
    if (this.searchString != '') {
      this.router.navigate(['/home/search-user'], { queryParams: { q: this.searchString } })
    }
  }
}
