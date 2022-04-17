import { Component, HostListener, OnInit } from '@angular/core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  faArrow = faAngleLeft;
  isOpen = true;
  profile: any;
  screenWidth: any;
  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
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
}
