import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CoachingSchedulerRoutes } from './utils/route.utils';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: CoachingSchedulerRoutes.COACHES,
        loadChildren: () => import('./pages/coach/coach-homepage.module').then((m) => m.CoachHomepageModule)
      },
      {
        path: CoachingSchedulerRoutes.STUDENTS,
        loadChildren: () => import('./pages/student/student-homepage.module').then((m) => m.StudentHomepageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

