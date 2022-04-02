import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  isAdmin = false;
  isDropdown = false;
  isAccountDropdown = false;
  isReportDropdown = false;
  arrowReport = 'bi bi-chevron-down';
  arrowAccount = 'bi bi-chevron-down'
  ngOnInit(): void {
    if (localStorage.getItem('role') === 'admin')
      this.isAdmin = true;
  }
  dropdown(event: any) {
    event.preventDefault();
    this.isDropdown = !this.isDropdown;
    if (!this.isDropdown) {
      this.isAccountDropdown = false;
      this.isReportDropdown = false;
    }
  }
  accountDropdown(event: any) {
    event.preventDefault();
    this.isAccountDropdown = !this.isAccountDropdown;
    this.arrowAccount = (!this.isAccountDropdown) ? 'bi bi-chevron-down' : 'bi bi-chevron-up'
  }
  reportDropdown(event: any) {
    event.preventDefault();
    this.isReportDropdown = !this.isReportDropdown;
    this.arrowReport = (!this.isReportDropdown) ? 'bi bi-chevron-down' : 'bi bi-chevron-up'

  }
}
