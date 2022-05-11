import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services';
import { Output, EventEmitter } from '@angular/core';
import { OBJ_ROUTE_NAV } from '../utils/constant';
import { map, findKey } from 'lodash';

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

  check = false;

  @Output() subNavigation = new EventEmitter<string[]>();

  ngDoCheck() {
    this.check = localStorage.getItem('check') === 'true';
    if (!this.check) {
      return;
    }
    let listTmp = JSON.parse(localStorage.getItem('listNav')) || [];
    if (listTmp.length > 1) {
      if (['Manage', 'Group', 'New feed'].includes(listTmp[1].nameEn)) {
        listTmp = listTmp.splice(1, 4);
      }
    }
    listTmp = map(listTmp, 'nameEn').map((item: any) => {
      return findKey(OBJ_ROUTE_NAV, (o) => o.nameEn == item)
    });
    this.mainActive = listTmp[0] || '';
    this.subActive = listTmp[1] || '';
    if (listTmp[2] == 'information') listTmp[2] = 'account'
    this.sub2Active = listTmp[2] || '';
  }
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
    localStorage.setItem('check', 'false')
    event.preventDefault();
    this.isAccountDropdown = !this.isAccountDropdown;
    this.arrowAccount = (!this.isAccountDropdown) ? 'bi bi-chevron-down' : 'bi bi-chevron-up';
    if (this.isAccountDropdown) this.subActive = 'account';
  }
  reportDropdown(event: any) {
    localStorage.setItem('check', 'false')
    event.preventDefault();
    this.isReportDropdown = !this.isReportDropdown;
    this.arrowReport = (!this.isReportDropdown) ? 'bi bi-chevron-down' : 'bi bi-chevron-up'
    if (this.isReportDropdown) this.subActive = 'report';
  }

  redirectTo(link: any) {
    localStorage.setItem('check', 'false')
    if (link === 'manage') {
      this.mainActive = link;
      return;
    }
    this.router.navigate([`home/${link}`]);
    this.mainActive = link;
    if (link != 'index')
      this.getSubNav([this.mainActive]);
    this.sub2Active = '';
    this.subActive = '';
  }
  redirectSubMenuTo(link: any, level: any) {
    localStorage.setItem('check', 'false')
    this.mainActive = 'manage'
    if (level === 1) {
      if (link === 'account' || link === 'report') {
        this.subActive = link;
        this.getSubNav([this.mainActive, this.subActive])
        return;
      }
      this.sub2Active = ''
      this.router.navigate([`home/${link}`]);
      this.subActive = link;
      this.getSubNav([this.mainActive, this.subActive])
      return;
    }
    if (['sign-up', 'users', 'account'].includes(link)) {
      this.subActive = 'account';
    } else {
      this.subActive = 'report';
    }
    this.router.navigate([`home/${link}`]);
    this.sub2Active = link;
    this.getSubNav([this.mainActive, this.subActive, this.sub2Active])
  }

  getSubNav(value: string[]) {
    value.unshift('index');
    if (value[3] === 'account') value[3] = 'information';
    value = value.map((itm: any) => {
      return OBJ_ROUTE_NAV[itm]
    })
    localStorage.setItem('listNav', JSON.stringify(value));
    this.subNavigation.emit(value);
  }
}
