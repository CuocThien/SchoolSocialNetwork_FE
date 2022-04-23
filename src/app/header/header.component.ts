import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HomeIndexService } from '../services/index';

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
    private service: HomeIndexService
  ) { }
  lang = 'HEADER.ENGLISH'
  profile: any;
  page = 1;
  listNotification = [];
  isEndListNotification = false;
  isLangEn = false;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  isCheck = false;

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
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
      error: (err: any) => console.log(err)
    })
  }
  onEnd(event: any) {
    this.page++;
    if (this.isEndListNotification) return;
    this._getNotification();
  }
  readNotification(notifyId: any, index: any) {
    this.service.readNotification(notifyId).subscribe((res: any) => {
      console.log("🐼 => HeaderComponent => res", res)
      this.router.navigate([`/home/post/${res.data.postId}`])
      this.listNotification[index].isRead = true;
    })
  }
  openNoti(event: any) {
    event.preventDefault();
    this.isCheck = !this.isCheck;
  }
}
