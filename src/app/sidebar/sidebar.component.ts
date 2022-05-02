import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private groupService: GroupService,
    private router: Router
  ) { }
  isAdmin = false;
  isDean = false;
  isAdminSubGr = false;
  isDropdown = false;
  isAccountDropdown = false;
  isReportDropdown = false;
  arrowReport = 'bi bi-chevron-down';
  arrowAccount = 'bi bi-chevron-down';

  mainActive = 'index';
  subActive = '';
  sub2Active = '';

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
      this.sub2Active = '';
      this.subActive = '';
    }
  }
  accountDropdown(event: any) {
    event.preventDefault();
    this.isAccountDropdown = !this.isAccountDropdown;
    this.arrowAccount = (!this.isAccountDropdown) ? 'bi bi-chevron-down' : 'bi bi-chevron-up';
    if (this.isAccountDropdown) this.subActive = 'account';
  }
  reportDropdown(event: any) {
    event.preventDefault();
    this.isReportDropdown = !this.isReportDropdown;
    this.arrowReport = (!this.isReportDropdown) ? 'bi bi-chevron-down' : 'bi bi-chevron-up'
    if (this.isReportDropdown) this.subActive = 'report';
  }

  redirectTo(link: any) {
    if (link === 'manage') {
      this.mainActive = link;
      return;
    }
    this.router.navigate([`home/${link}`]);
    this.mainActive = link;
    this.sub2Active = '';
    this.subActive = '';
  }
  redirectSubMenuTo(link: any, level: any) {
    this.mainActive = 'manage'
    if (level === 1) {
      if (link === 'account' || link === 'report') {
        this.subActive = link;
        return;
      }
      this.sub2Active = ''
      this.router.navigate([`home/${link}`]);
      this.subActive = link;
      return;
    }
    if (['sign-up', 'users', 'account'].includes(link)) {
      this.subActive = 'account';
    } else {
      this.subActive = 'report';
    }
    this.router.navigate([`home/${link}`]);
    this.sub2Active = link;
  }
}
