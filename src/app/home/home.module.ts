import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';



@NgModule({
  declarations: [GroupComponent, GroupDetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }


