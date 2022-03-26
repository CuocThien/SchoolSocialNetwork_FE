//modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr';

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
import { ChangePasswordService, ChatService, LogInService, ProfileService, UploadImageService } from './services/index';
import { ChangePasswordOtpComponent } from './popup/change-password-otp/change-password-otp.component'

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
    InfiniteScrollModule

  ],
  providers: [AuthGuardService, ChatService, ChangePasswordService, LogInService, ProfileService, UploadImageService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
