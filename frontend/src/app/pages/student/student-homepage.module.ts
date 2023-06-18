import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomepageComponent } from './student-homepage/student-homepage.component';
import { StudentHomepageRoutingModule } from './student-homepage/student-homepage-routing.module';



@NgModule({
  declarations: [StudentHomepageComponent],
  imports: [
    CommonModule,
    StudentHomepageRoutingModule
  ]
})
export class StudentHomepageModule { }
