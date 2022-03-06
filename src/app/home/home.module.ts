import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { HomeRoutingModule } from './home-routing.module';
import { GroupComponent } from './group/group.component';



@NgModule({
  declarations: [TestComponent, GroupComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }


