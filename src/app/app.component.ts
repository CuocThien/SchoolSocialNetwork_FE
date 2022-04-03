import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/sass/main.scss']
})
export class AppComponent {
  title = 'SchoolSocialNetwork';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    localStorage.setItem('lang', 'en')
  }

}

