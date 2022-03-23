import { Component, Input, OnInit } from '@angular/core';
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

  @Input() profile: any;
  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['/'])
    localStorage.clear();
  }
}
