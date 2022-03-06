import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            // { path: '',  },
            // { path: '', redirectTo: '/test', pathMatch: 'full' },
            { path: 'test', component: TestComponent },
            { path: 'group', component: GroupComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }