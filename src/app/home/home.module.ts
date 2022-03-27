import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { ChatComponent } from './chat/chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { IndexComponent } from './index/index.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
  declarations: [GroupComponent, GroupDetailComponent, ChatComponent, ProfileComponent, ChangePasswordComponent, IndexComponent, PostDetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    FormsModule,
    InfiniteScrollModule,
    NgbPaginationModule,
    NgSelectModule
  ]
})
export class HomeModule { }


