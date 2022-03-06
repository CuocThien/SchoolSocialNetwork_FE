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
  ngOnInit(): void {
    this.isOpen = true;
  }
  openOrCloseSidebar() {
    this.isOpen = !this.isOpen;
    this.faArrow = this.isOpen ? faAngleLeft : faAngleRight;
  }
}
