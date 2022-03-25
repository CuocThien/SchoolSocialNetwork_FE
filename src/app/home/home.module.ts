import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { ChatComponent } from './chat/chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [GroupComponent, GroupDetailComponent, ChatComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    FormsModule,
    InfiniteScrollModule
  ]
})
export class HomeModule { }


