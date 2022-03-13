import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth.guard';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuardService],
        children: [
            { path: 'group', component: GroupComponent, pathMatch: 'full' },
            { path: 'group/:id', component: GroupDetailComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }