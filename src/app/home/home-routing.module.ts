import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChatComponent } from './chat/chat.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { HomeComponent } from './home.component';
import { GroupComponent } from './group/group.component';
import { ProfileComponent } from './profile/profile.component';
import { IndexComponent } from './index/index.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FacultyComponent } from './faculty/faculty.component';
import { CategoryComponent } from './category/category.component';

import { AuthGuardService } from '../auth.guard';
import { UsersComponent } from './users/users.component';
import { ReportGroupComponent } from './report-group/report-group.component';
import { ReportPostComponent } from './report-post/report-post.component';
import { AccountComponent } from './account/account.component';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { SearchUserComponent } from './search-user/search-user.component';

const homeRoutes: Routes = [
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuardService],
        children: [
            { path: '', redirectTo: '/home/index', pathMatch: 'full' },
            { path: 'index', component: IndexComponent, pathMatch: 'full' },
            { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
            { path: 'sign-up', component: SignUpComponent, pathMatch: 'full' },
            { path: 'faculty', component: FacultyComponent, pathMatch: 'full' },
            { path: 'category', component: CategoryComponent, pathMatch: 'full' },
            { path: 'change-password', component: ChangePasswordComponent, pathMatch: 'full' },
            { path: 'group', component: GroupComponent, pathMatch: 'full' },
            { path: 'group/:id', component: GroupDetailComponent, pathMatch: 'full' },
            { path: 'chat', component: ChatComponent, pathMatch: 'full' },
            { path: 'users', component: UsersComponent, pathMatch: 'full' },
            { path: 'post/:id', component: PostDetailComponent, pathMatch: 'full' },
            { path: 'report/group', component: ReportGroupComponent, pathMatch: 'full' },
            { path: 'report/post', component: ReportPostComponent, pathMatch: 'full' },
            { path: 'account', component: AccountComponent, pathMatch: 'full' },
            { path: 'new-feed', component: NewFeedComponent, pathMatch: 'full' },
            { path: 'search-user', component: SearchUserComponent, pathMatch: 'full' },


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }