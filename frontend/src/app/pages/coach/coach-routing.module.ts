import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachHomepageComponent } from './coach-homepage.component';
import { CoachOverview } from './overview/coach-overview.component';


const routes: Routes = [
  {
    path: '',
    component: CoachHomepageComponent,
  },
  {
    path: ':id',
    component: CoachOverview
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule {
}
