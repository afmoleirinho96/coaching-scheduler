import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoachService } from '../../../core/services/coach.service';
import { Coach } from '../../../core/models/coach.model';
import { Slot, SlotStatus } from '../../../core/models/slot.model';
import { MatDialog } from '@angular/material/dialog';
import { CoachConfirmBookingModalComponent } from './coach-confirm-booking-modal/coach-confirm-booking-modal.component';


@Component({
  selector: 'cs-coach-overview',
  templateUrl: './coach-overview.component.html',
  host: { class: 'w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CoachOverview implements OnInit {

  coach: Coach;
  SlotStatus = SlotStatus;
  showPastLessons = false;

  constructor(private readonly coachService: CoachService,
              private route: ActivatedRoute,
              private readonly dialog: MatDialog,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.retrieveCoachFromUrl();
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

  onSlotsUpdated(slots: Slot[]) {
    if (this.coach) {
      this.coach.slots = [...this.coach.slots, ...slots];
    }
  }

  executeAction(slot: Slot) {
    this.dialog.open(CoachConfirmBookingModalComponent, {
      width: '700px',
      panelClass: 'rootModal',
      data: { coachId: this.coach.id, slots: [slot] }
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getCoachInfo(this.coach.id);
      }
    });
  }
}
