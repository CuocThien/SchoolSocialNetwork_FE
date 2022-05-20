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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { UsersComponent } from './users/users.component';
import { ImageCropperModule } from "ngx-image-cropper";
import { ReportGroupComponent } from './report-group/report-group.component';
import { ReportPostComponent } from './report-post/report-post.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './account/account.component';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { RegisterEnterpriseComponent } from './register-enterprise/register-enterprise.component';
import { RecruitmentNewsComponent } from './recruitment-news/recruitment-news.component';





@NgModule({
  declarations: [
    SafeHtmlPipe,
    GroupComponent, GroupDetailComponent, ChatComponent, ProfileComponent, ChangePasswordComponent, IndexComponent, PostDetailComponent, CommentComponent, ReplyComponent, SignUpComponent, FacultyComponent, CategoryComponent, UsersComponent, ReportGroupComponent, ReportPostComponent, AccountComponent, NewFeedComponent, SearchUserComponent, EnterpriseComponent, RegisterEnterpriseComponent, RecruitmentNewsComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    FormsModule,
    InfiniteScrollModule,
    NgbPaginationModule,
    NgSelectModule,
    CKEditorModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ImageCropperModule,
    NgxSpinnerModule
  ]
})
export class HomeModule { }


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}