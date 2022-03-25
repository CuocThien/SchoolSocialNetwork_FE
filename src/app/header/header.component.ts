import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  profile: any;
  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
  }
  ngAfterViewChecked() {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')

  }

  logout() {
    this.router.navigate(['/'])
    localStorage.clear();
  }
}
