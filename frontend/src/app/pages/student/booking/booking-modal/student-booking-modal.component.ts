import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentBookingModalData } from '../../../../core/models/dashboard.model';
import { SlotsBookedRequest } from '../../../../core/models/slot.model';
import { SlotService } from '../../../../core/services/slot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'cs-student-booking-modal',
  templateUrl: './student-booking-modal.component.html'
})
export class StudentBookingModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StudentBookingModalData,
    private dialogRef: MatDialogRef<any>,
    private readonly slotService: SlotService,
    private readonly snackBar: MatSnackBar,
    private toastService: ToastrService
  ) {}

  save(): void {
    const requestBody: SlotsBookedRequest = {
      slotIds: this.data.availabilities.map(slot => Number(slot.id))
    };

    this.slotService.markSlotsAsBooked(this.data.student.id, requestBody).pipe(
      catchError((error) => {
        const validationError = error.error?.message || 'Something went wrong. Please try again, otherwise contact the administrator.';
        this.toastService.error(validationError);
        return throwError(() => error);
      }),
    ).subscribe(() => {
      this.showSuccessFeedbackMessage();
    })
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  private showSuccessFeedbackMessage() {
    const snackbarMessage = `Booked ${this.data.availabilities.length} lessons with ${this.data.coach.name}, pending confirmation.
      You are one step closer to your healthcare professional journey!
      Stay motivated!`;

    this.snackBar.open(snackbarMessage, 'X', {
      duration: 12000,
    });

    this.dialogRef.close({ selectedCoach: this.data.coach });
  }

}
