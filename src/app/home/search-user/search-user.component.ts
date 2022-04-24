import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class SearchUserComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ChatService,
    private router: Router
  ) { }
  isLangEn = false;
  listAccount: any;
  userId: any;
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this.userId = JSON.parse(localStorage.getItem('profile'))._id;
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.service.searchAccount({ keyword: res.q }).subscribe({
        next: (res: any) => {
          this.listAccount = res.data.result
        }
      })
    })
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'

  }
  goToChat(account: any) {
    this.service.getConversation({ id1: this.userId, id2: account._id }).subscribe((res: any) => {
      localStorage.setItem('conversation', JSON.stringify(res.data));
      this.router.navigate(['home/chat'])
    })
  }
}
