import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private translate: TranslateService
  ) { }
  lang = 'HEADER.ENGLISH'
  profile: any;
  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
  }
  ngAfterViewChecked() {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')

  }

  logout() {
    this.router.navigate(['/'])
    localStorage.clear();
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
}
