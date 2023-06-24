import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Slot, SlotStatus } from '../../../core/models/slot.model';
import { Student } from '../../../core/models/student.model';
import { StudentService } from '../../../core/services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheService } from '../../../core/services/cache.service';
import { Coach } from '../../../core/models/coach.model';
import { map, Observable } from 'rxjs';
import { CoachService } from '../../../core/services/coach.service';
import { SlotService } from '../../../core/services/slot.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentBookingModalComponent } from './booking-modal/student-booking-modal.component';
import { extractDate } from '../../../utils/date.utils';


@Component({
  selector: 'cs-student-details',
  templateUrl: './student-booking.component.html',
  host: { class: 'w-full overflow-hidden' },
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StudentBookingComponent implements OnInit {

  student: Student;
  coaches$: Observable<Coach[]>;

  selectedCoach: Coach;

  coachDetails$: Observable<Coach>;
  hasAvailableSlots: boolean;

  selectedCoachAvailability$: Observable<Record<string, Slot[]>>;

  form: FormGroup = this.fb.group({
    selectedCoach: [Validators.required],
  });

  selectedAvailabilities: Slot[] = [];

  constructor(private readonly cacheService: CacheService,
              private readonly studentService: StudentService,
              private readonly coachService: CoachService,
              private readonly slotService: SlotService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.retrieveStudentFromUrl();
    this.coaches$ = this.cacheService.getCachedCoaches();
    this.listenToSelectedCoachChanges();
  }


  private listenToSelectedCoachChanges() {
    this.form.get('selectedCoach')?.valueChanges.subscribe((selectedCoach) => {
      this.getCoachInfo(selectedCoach);
    });
  }

  private getCoachInfo(selectedCoach: Coach) {
    this.selectedCoach = selectedCoach
    this.coachDetails$ = this.coachService.getCoachById(selectedCoach.id)

    this.selectedCoachAvailability$ = this.coachDetails$.pipe(
      map(coach => {
        const availableSlots = coach.slots?.filter(slot => slot.status === SlotStatus.Available) ?? [];
        this.hasAvailableSlots = !!availableSlots.length
        return this.groupSlotsByDate(availableSlots);
      })
    );
    this.cdr.markForCheck();
  }

  onChipSelectionChange(availability: Slot) {
    const availabilityIndex = this.selectedAvailabilities.findIndex(selectedAvailability => selectedAvailability?.id === availability?.id);

    if (availabilityIndex >= 0) {
      this.selectedAvailabilities.splice(availabilityIndex, 1);
    } else {
      this.selectedAvailabilities.push(availability);
    }

  }

  bookSlots() {
    this.openBookSlotsModal();
  }

  private groupSlotsByDate(slots: Slot[]) {
    return slots.reduce((acc, slot) => {
      const date = extractDate(slot.startTime)
      const dateSlots = acc[date] ?? [];

      dateSlots.push(slot);
      acc[date] = dateSlots;

      return acc;
    }, {} as { [key: string]: Slot[] });
  }

  private retrieveStudentFromUrl() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.studentService.getStudentById(id).subscribe((student) => {
      this.student = student;
      this.cdr.markForCheck();
    });
  }

  private openBookSlotsModal() {
    this.dialog.open(StudentBookingModalComponent, {
      width: '700px',
      panelClass: 'rootModal',
      data: { coach: this.selectedCoach, availabilities: this.selectedAvailabilities, student: this.student }
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.updateView();
      }
    });
  }

  private updateView() {
    this.getCoachInfo(this.selectedCoach);
    this.selectedAvailabilities = [];
  }
}
