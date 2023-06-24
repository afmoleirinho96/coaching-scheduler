import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingConfirmModalData } from '../../../../core/models/dashboard.model';
import { SlotService } from '../../../../core/services/slot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { SlotScheduleRequest } from '../../../../core/models/slot.model';
import { catchError, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cs-coach-confirm-booking-modal',
  templateUrl: './coach-confirm-booking-modal.component.html',
  styleUrls: ['./coach-confirm-booking-modal.component.scss']
})
export class CoachConfirmBookingModalComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookingConfirmModalData,
    private dialogRef: MatDialogRef<any>,
    private readonly slotService: SlotService,
    private readonly snackBar: MatSnackBar,
    private toastService: ToastrService
  ) {}

  save(): void {
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

  private showScheduledLessonMessage() {
    const datePipe = new DatePipe('en-US');
    const dayFormatted = datePipe.transform(this.data.slots[0].startTime, 'EEEE, d MMMM');
    const startTimeFormatted = datePipe.transform(this.data.slots[0].startTime, 'hh:mm a');
    const endTimeFormatted = datePipe.transform(this.data.slots[0].endTime, 'hh:mm a');
    const message = `Lesson has been scheduled successfully on ${dayFormatted} from ${startTimeFormatted} to ${endTimeFormatted}.`;

    this.toastService.success(message);
    this.dialogRef.close(true);
  }

  closeModal() {
    this.dialogRef.close(false);
  }


 /* private showSuccessFeedbackMessage() {
    const snackbarMessage = `Booked ${this.data.availabilities.length} lessons with ${this.data.coach.name}, pending confirmation.
      You are one step closer to your healthcare professional journey!
      Stay motivated!`;

    this.snackBar.open(snackbarMessage, 'X', {
      duration: 8000,
    });

    this.dialogRef.close({ selectedCoach: this.data.coach });
  }*/

}
