import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoachActionModalData } from '../../../../core/models/dashboard.model';
import { SlotService } from '../../../../core/services/slot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { SlotScheduleRequest } from '../../../../core/models/slot.model';
import { catchError, delay, finalize, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActionType } from '../coach-overview.component';
import { LessonRequest } from '../../../../core/models/lesson.model';
import { LessonService } from '../../../../core/services/lesson.service';

@Component({
  selector: 'cs-coach-confirm-booking-modal',
  templateUrl: './coach-action-modal.component.html'
})
export class CoachActionModalComponent {

  isCreatingLesson = false;

  creatingLessonSpinnerMessage = 'We are simulating a session between you and a student. Please wait for 10 seconds.'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CoachActionModalData,
    private dialogRef: MatDialogRef<any>,
    private readonly slotService: SlotService,
    private readonly snackBar: MatSnackBar,
    private toastService: ToastrService,
    private lessonService: LessonService
  ) {}

  save(): void {
    const actions = {
      [ActionType.SimulateLesson]: () => this.handleSaveLesson(),
      [ActionType.Confirm]: () => this.handleScheduleSlot()
    }

    return actions[this.data.actionType]();
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  private showScheduledLessonMessage() {
    const datePipe = new DatePipe('en-US');
    const dayFormatted = datePipe.transform(this.data.slots[0].startTime, 'EEEE, d MMMM');
    const startTimeFormatted = datePipe.transform(this.data.slots[0].startTime, 'hh:mm a', 'UTC');
    const endTimeFormatted = datePipe.transform(this.data.slots[0].endTime, 'hh:mm a', 'UTC');
    const message = `Lesson has been scheduled successfully on ${dayFormatted} from ${startTimeFormatted} to ${endTimeFormatted}.`;

    this.toastService.success(message);
    this.dialogRef.close(true);
  }

  private showCreatedLessonMessage() {
    const message = `The lesson has already taken place. Please visit lesson history to review and score it.`;

    this.snackBar.open(message, 'X', {
      duration: 12000,
    });

    this.dialogRef.close(true);
  }

  private handleSaveLesson() {
    const slot = this.data.slots[0]

    const requestBody: LessonRequest = {
      slot,
    };

    this.isCreatingLesson = true;

    this.lessonService.createLesson(requestBody).pipe(
      catchError((error) => {
        const validationError = error.error?.message || 'Something went wrong. Please try again, otherwise contact the administrator.';
        this.toastService.error(validationError);
        return throwError(() => error);
      }),
      delay(10000),
      finalize(() => this.isCreatingLesson = false)
    ).subscribe(() => {
      this.showCreatedLessonMessage();
    })
  }

  private handleScheduleSlot() {
    const requestBody: SlotScheduleRequest = {
      slotIds: this.data.slots.map(slot => String(slot.id))
    };

    this.slotService.markSlotsAsScheduled(this.data.coachId, requestBody).pipe(
      catchError((error) => {
        const validationError = error.error?.message || 'Something went wrong. Please try again, otherwise contact the administrator.';
        this.toastService.error(validationError);
        return throwError(() => error);
      }),
    ).subscribe(() => {
      this.showScheduledLessonMessage();
    })
  }
}
