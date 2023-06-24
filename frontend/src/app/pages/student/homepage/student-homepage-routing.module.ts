import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomepageComponent } from './student-homepage.component';


const routes: Routes = [{ path: '', component: StudentHomepageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentHomepageRoutingModule {
}
