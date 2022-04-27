import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private groupService: GroupService
  ) { }
  isAdmin = false;
  isDean = false;
  isAdminSubGr = false;
  isDropdown = false;
  isAccountDropdown = false;
  isReportDropdown = false;
  arrowReport = 'bi bi-chevron-down';
  arrowAccount = 'bi bi-chevron-down'
  ngOnInit(): void {
    this.groupService.checkExistedAdminSubGr().subscribe({
      next: (res: any) => {
        this.isAdminSubGr = res.data || false;
        localStorage.setItem('adminSubGr', this.isAdminSubGr.toString())
      }
    })
    const role = localStorage.getItem('role')
    if (role === 'admin')
      this.isAdmin = true;
    if (role === 'dean')
      this.isDean = true;
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
