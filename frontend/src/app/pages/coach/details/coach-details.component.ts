import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoachStore } from '../../../core/stores/coach-store.service';
import { CoachService } from '../../../core/services/coach.service';
import { Coach } from '../../../core/models/coach.model';
import { Slot, SlotStatus } from '../../../core/models/slot.model';


@Component({
  selector: 'cs-coach-details',
  templateUrl: './coach-details.component.html',
  host: { class: 'w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CoachDetailsComponent implements OnInit {

  coach: Coach;
  SlotStatus = SlotStatus;
  showPastLessons = false;

  constructor(private readonly coachService: CoachService,
              private coachStore: CoachStore,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.retrieveCoachFromUrl();

  }


  private retrieveCoachFromUrl() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

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
}
