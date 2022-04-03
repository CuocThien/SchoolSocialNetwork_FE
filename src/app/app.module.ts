//modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ckeditor4-angular';

//component
//abcdefghijklmnopqrstuvwxyz
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './popup/forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';

//service
import { AuthGuardService } from './auth.guard';
import { ChangePasswordService, ChatService, CommentService, CreatePostService, FacultyService, HomeIndexService, LogInService, PostDetailService, ProfileService, SignUpService, UploadImageService } from './services/index';
import { ChangePasswordOtpComponent } from './popup/change-password-otp/change-password-otp.component';
import { CreatePostComponent } from './popup/create-post/create-post.component';
import { ChangeCommentComponent } from './popup/change-comment/change-comment.component';
import { DeleteCommentComponent } from './popup/delete-comment/delete-comment.component';
import { CreateFacultyComponent } from './popup/create-faculty/create-faculty.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SidebarComponent,
    ChangePasswordOtpComponent,
    CreatePostComponent,
    ChangeCommentComponent,
    DeleteCommentComponent,
    CreateFacultyComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 1200,
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: "decreasing",
      positionClass: 'toast-top-right'

    }),
    BrowserAnimationsModule,
    InfiniteScrollModule,
    NgbPaginationModule,
    CKEditorModule,
    NgSelectModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [AuthGuardService, ChatService, CommentService, CreatePostService, ChangePasswordService, FacultyService, HomeIndexService, LogInService, PostDetailService, ProfileService, SignUpService, UploadImageService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}