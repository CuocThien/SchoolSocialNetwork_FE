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
  listAccount = [];
  userId: any;
  page = 1;
  maxPage = 1;
  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this.userId = JSON.parse(localStorage.getItem('profile'))._id;
    this._search();
  }
  private _search() {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.service.searchAccount({ keyword: res.q, page: this.page }).subscribe({
        next: (res: any) => {
          this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
          if (this.page != 1) {
            this.listAccount = [...this.listAccount, ...res.data.result]
          }
          this.listAccount = []
          this.listAccount = res.data.result
        }
      })
    })
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en'

  }
  goToPage(event: any) {
    this.page = event;
    this._search();
  }
  goToChat(account: any) {
    this.service.getConversation({ id1: this.userId, id2: account._id }).subscribe((res: any) => {
      localStorage.setItem('conversation', JSON.stringify(res.data));
      this.router.navigate(['home/chat'])
    })
  }
}
