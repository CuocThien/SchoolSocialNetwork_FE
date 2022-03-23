import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.isOpen = true;
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
  }
  openOrCloseSidebar() {
    this.isOpen = !this.isOpen;
    this.faArrow = this.isOpen ? faAngleLeft : faAngleRight;
  }
}
