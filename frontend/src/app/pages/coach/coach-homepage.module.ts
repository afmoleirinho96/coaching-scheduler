import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachHomepageComponent } from './coach-homepage/coach-homepage.component';
import { CoachHomepageRoutingModule } from './coach-homepage/coach-homepage-routing.module';



@NgModule({
  declarations: [CoachHomepageComponent],
  imports: [
    CommonModule,
    CoachHomepageRoutingModule
  ]
})
export class CoachHomepageModule { }
