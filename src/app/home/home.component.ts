import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  faArrow = faAngleLeft;
  isOpen = true;
  profile: any;
  screenWidth: any;
  isLangEn = false;

  listRouteNav = [];
  listStrNav = [];
  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '');
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this.listRouteNav = JSON.parse(localStorage.getItem('listNav')) || [];
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'
  }
  openOrCloseSidebar(event: any) {
    event.preventDefault();
    this.isOpen = !this.isOpen;
    this.faArrow = this.isOpen ? faAngleLeft : faAngleRight;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 680) {
      this.isOpen = false
      this.faArrow = this.isOpen ? faAngleLeft : faAngleRight;
    }
  }
  getSubNav(event: any) {
    this.listRouteNav = event
    localStorage.setItem('listNav', JSON.stringify(event));
  }
  redirectTo(link: any, index: any) {
    if (link != '') {
      this.listRouteNav.splice(index + 1, this.listRouteNav.length - index - 1)
    }
    if (link === '') {
      link = this.router.url;
    }
    localStorage.setItem('listNav', JSON.stringify(this.listRouteNav));
    localStorage.setItem('check', 'true');
    this.router.navigate([link])
  }
}
