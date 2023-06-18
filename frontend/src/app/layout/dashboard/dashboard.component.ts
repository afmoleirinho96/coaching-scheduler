import { Component, OnInit } from '@angular/core';
import { viewModes } from './dashboard.config';
import { ViewMode } from '../../core/models/dashboard.model';
import { MatDialog } from '@angular/material/dialog';
import { EntityModalComponent } from '../dialogs/entity-modal.component';
import { CoachingSchedulerRoutes } from '../../utils/route.utils';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'cs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  viewModes: ViewMode[] = viewModes;

  CoachingSchedulerRoutes = CoachingSchedulerRoutes;

  isDashboardRoute = false;

  constructor(private readonly dialog: MatDialog, private router: Router) {
    this.isDashboardRoute = this.router.url === `/${CoachingSchedulerRoutes.DASHBOARD}`;
  }


  ngOnInit() {
    this.listenToRouteChange();
  }

  addEntity(viewMode: ViewMode) {

    const dialogRef = this.dialog.open(EntityModalComponent, {
      width: '700px',
      panelClass: 'rootModal',
      data: { viewMode }
    });
  }

  private listenToRouteChange() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const navigationEndEvent = event as NavigationEnd;
      this.isDashboardRoute = navigationEndEvent.url === `/${ CoachingSchedulerRoutes.DASHBOARD }`;
    });
  }
}
