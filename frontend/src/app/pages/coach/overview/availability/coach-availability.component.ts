import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlotService } from '../../../../core/services/slot.service';
import { Slot, SlotsAvailableRequest } from '../../../../core/models/slot.model';
import { Coach } from '../../../../core/models/coach.model';
import { slotToHour } from '../../../../utils/date.utils';

@Component({
  selector: 'cs-coach-availability',
  templateUrl: './coach-availability.component.html'
})
export class CoachAvailabilityComponent {

  @Input() coach: Coach;
  @Output() availabilityUpdated: EventEmitter<Slot[]> = new EventEmitter<Slot[]>();

  form: FormGroup = this.fb.group({
    date: ['', Validators.required],
    time: [{ value: '', disabled: true }, Validators.required]
  });

  availableTimeSlots: string[] = [];
  todayDate: Date = new Date();

  private static DEFAULT_START_HOUR = 8
  private static DEFAULT_END_HOUR = 19;

  constructor(private slotsService: SlotService,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) { }

  onDateChange(selectedDate: Date) {
    this.form.get('time')?.enable();
    const isDateToday = selectedDate.toDateString() == this.todayDate.toDateString();

    if (isDateToday) {
      const nextPossibleStartHour = this.getNextStartSlot();
      this.availableTimeSlots = this.generateTimeSlots(Math.max(CoachAvailabilityComponent.DEFAULT_START_HOUR, nextPossibleStartHour), selectedDate);
      return;
    }

    this.availableTimeSlots = this.generateTimeSlots(CoachAvailabilityComponent.DEFAULT_START_HOUR, selectedDate);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const { date, time } = this.form.value;
    const [hour, minute] = time.split(':').map(Number);

    const startTime = new Date(date);
    startTime.setHours(hour, minute);

    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 2);

    this.markSlotAsAvailable(startTime, endTime);
  }

  private generateTimeSlots(startHour: number, selectedDate: Date): string[] {
    if (startHour > CoachAvailabilityComponent.DEFAULT_END_HOUR) {
      this.displayOutOfBusinessHoursMessage();
    }
    const allTimeSlots = this.buildAllTimeSlots(startHour);

    // filter the generated slots based on the availableSlots for the selected date
    if (!this.coach?.slots?.length) {
      return allTimeSlots;
    }
    return this.filterOverlappingSlots(allTimeSlots, selectedDate);
  }


  /**
   * Assuming a coach has business hours 8h-19h30, if he tries to schedule a time slot for today (after 19h30)
   */
  private displayOutOfBusinessHoursMessage() {
    this.snackBar.open('Thank you for your effort, but perhaps it would be better for you to rest instead of scheduling a lesson for such a late hour!.', 'X', {
      duration: 5000,
    });
  }

  /**
   * Filters out overlapping time slots (slots that are available for that day already) from a list of all possible time slots.
   *
   * @param {string[]} allTimeSlots - Array of all possible time slots in 'HH:MM' format.
   * @param {Date} selectedDate - The selected date for which overlapping slots need to be filtered.
   *
   * @returns {string[]} - Returns an array of non-overlapping time slots for the selected date.
   *
   */
  private filterOverlappingSlots(allTimeSlots: string[], selectedDate: Date): string[] {
    const slotsForSelectedDate = this.coach.slots.filter(slot => this.isSameDay(slot.startTime, selectedDate));

    // Find and remove overlapping times from the generated slots
    for (let slot of slotsForSelectedDate) {
      const startHour = slot.startTime.getHours() + slot.startTime.getMinutes() / 60;
      const endHour = slot.endTime.getHours() + slot.endTime.getMinutes() / 60;

      allTimeSlots = allTimeSlots.filter(slot => {
        const slotStartHour = slotToHour(slot);
        // Add 2 hours to the slotHour to account for lesson duration
        const slotEndHour = slotStartHour + 2;
        return this.isOverlapping(slotStartHour, slotEndHour, startHour, endHour);
      });
    }

    return allTimeSlots;
  }

  /**
   * Determines if a given time slot overlaps with another slot.
   */
  private isOverlapping(slotStartHour: number, slotEndHour: number, startHour: number, endHour: number): boolean {
    return slotEndHour <= startHour || slotStartHour >= endHour;
  }

  /**
   * This method generates a list of half-hour time slots starting from a given hour until the end of the day.
   * @param startHour - The hour from which to start generating time slots.
   *
   * @returns An array of strings, each representing a half-hour slot, starting from the startHour until the default end hour.
   *
   * Right now business hours is set in between 8h -> 19h30. Each time slot is formatted as "HH:MM".
   */
  private buildAllTimeSlots(startHour: number) {
    return Array.from({ length: ( CoachAvailabilityComponent.DEFAULT_END_HOUR - startHour + 1 ) }, (_, index) => index + startHour)
      .flatMap(hour => [hour + ":00", hour + ":30"]);
  }


  /**
   * Calculates and returns the next possible start hour based on the current time (for today date only).
   *
   * Eg: 12h51, next slot hour is 13h.
   *
   * @returns {number} - The next possible start hour.
   */
  private getNextStartSlot(): number {
    const currentHour = this.todayDate.getHours();
    const currentMinute = this.todayDate.getMinutes();
    return currentMinute > 0 ? currentHour + 1 : currentHour;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  private markSlotAsAvailable(startTime: Date, endTime: Date) {
    const requestBody: SlotsAvailableRequest = {
      slots: [{ startTime: startTime, endTime: endTime }]
    };

    this.slotsService.markSlotsAsAvailable(this.coach.id, requestBody).subscribe((slots: Slot[]) => {
      this.availabilityUpdated.emit(slots);
      this.resetForm();
    })
  }

  private resetForm(): void {
    this.form.reset();
    this.form.get('date')?.setErrors(null);
    this.form.get('time')?.disable();
  }
}
