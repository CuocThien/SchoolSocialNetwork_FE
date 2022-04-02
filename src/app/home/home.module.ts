import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { ChatComponent } from './chat/chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { IndexComponent } from './index/index.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ckeditor4-angular';
import { CommentComponent } from './comment/comment.component';
import { ReplyComponent } from './comment/reply/reply.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FacultyComponent } from './faculty/faculty.component';




@NgModule({
  declarations: [GroupComponent, GroupDetailComponent, ChatComponent, ProfileComponent, ChangePasswordComponent, IndexComponent, PostDetailComponent, CommentComponent, ReplyComponent, SignUpComponent, FacultyComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    FormsModule,
    InfiniteScrollModule,
    NgbPaginationModule,
    NgSelectModule,
    CKEditorModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }


