import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  isAdmin = false;
  ngOnInit(): void {
    if (localStorage.getItem('role') === 'admin')
      this.isAdmin = true;
  }

}
