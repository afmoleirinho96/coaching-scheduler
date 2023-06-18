import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachHomepageComponent } from './coach-homepage.component';


const routes: Routes = [{ path: '', component: CoachHomepageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachHomepageRoutingModule {
}
