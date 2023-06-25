import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachService } from '../../../core/services/coach.service';
import { Coach } from '../../../core/models/coach.model';
import { Slot, SlotStatus } from '../../../core/models/slot.model';
import { MatDialog } from '@angular/material/dialog';
import { CoachActionModalComponent } from './action-modal/coach-action-modal.component';
import { CoachActionModalData } from '../../../core/models/dashboard.model';


export type ActionMappings = {
  [key in ActionType]: Action;
};
export interface Action {
  type: ActionType;
  title: Title;
}

export enum ActionType {
  SimulateLesson = 'simulate-lesson',
  Confirm = 'confirm',
}

export enum Title {
  SimulateLesson = 'Simulate Lesson',
  Confirm = 'Confirm',
}

@Component({
  selector: 'cs-coach-overview',
  templateUrl: './coach-overview.component.html',
  host: { class: 'w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CoachOverview implements OnInit {

  coach: Coach;
  SlotStatus = SlotStatus;

  actionMappings: ActionMappings = {
    [ActionType.SimulateLesson]: {
      type: ActionType.SimulateLesson,
      title: Title.SimulateLesson
    },
    [ActionType.Confirm]: {
      type: ActionType.Confirm,
      title: Title.Confirm
    }
  };

  constructor(private readonly coachService: CoachService,
              private route: ActivatedRoute,
              private router: Router,
              private readonly dialog: MatDialog,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.retrieveCoachFromUrl();
  }

  onSlotsUpdated(slots: Slot[]) {
    if (this.coach) {
      this.coach.slots = [...this.coach.slots, ...slots];
    }
  }

  executeAction(action: Action, slot: Slot) {
    const actions = {
      [ActionType.SimulateLesson]: () => this.handleSimulateLesson(slot),
      [ActionType.Confirm]: () => this.handleConfirmBooking(slot)
    }
    return actions[action.type]();
  }

  navigateToLessonHistory() {
    this.router.navigate(['history'], { relativeTo: this.route, replaceUrl: true  });
  }

  private retrieveCoachFromUrl() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.getCoachInfo(Number(id));
  }

  private getCoachInfo(id: number) {
    this.coachService.getCoachById(id).subscribe((coach) => {
      this.coach = coach;
      this.cdr.markForCheck();
    });
  }

  private handleConfirmBooking(slot: Slot) {
    const dialogData: CoachActionModalData = {
      coachId: this.coach.id,
      slots: [slot],
      description: 'By confirming this lesson, it will be added to your calendar and scheduled.',
      title: 'Confirm Lesson',
      actionType: ActionType.Confirm

    };

    this.openActionModal(dialogData);
  }

  private handleSimulateLesson(slot: Slot) {
    const dialogData: CoachActionModalData = {
      coachId: this.coach.id,
      slots: [slot],
      description: 'Begin the lesson with your student. Once the lesson is completed, you will be able to view it in your lesson history.',
      title: 'Simulate Lesson',
      actionType: ActionType.SimulateLesson
    };

    this.openActionModal(dialogData);
  }

  private openActionModal(dialogData: CoachActionModalData) {
    this.dialog.open(CoachActionModalComponent, {
      width: '700px',
      panelClass: 'rootModal',
      data: dialogData
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getCoachInfo(this.coach.id);
      }
    });
  }
}
