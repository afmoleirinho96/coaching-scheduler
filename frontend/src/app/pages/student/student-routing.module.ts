import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomepageComponent } from './homepage/student-homepage.component';
import { StudentBookingComponent } from './booking/student-booking.component';


const routes: Routes = [
  {
    path: '', component: StudentHomepageComponent
  },
  {
    path: ':id', component: StudentBookingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
