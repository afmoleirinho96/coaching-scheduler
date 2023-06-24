import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CoachHomepageComponent } from './coach-homepage.component';
import { CoachRoutingModule } from './coach-routing.module';
import { CoachListComponent } from './list/coach-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoachOverview } from './overview/coach-overview.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoachAvailabilityComponent } from './overview/availability/coach-availability.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { FilterStatusGroupByDatePipe } from '../../pipes/slot-filter.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedCardComponent } from '../../shared/card/shared-card.component';
import { CoachConfirmBookingModalComponent } from './overview/coach-confirm-booking-modal/coach-confirm-booking-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    CoachHomepageComponent,
    CoachListComponent,
    CoachOverview,
    CoachAvailabilityComponent,
    FilterStatusGroupByDatePipe,
    CoachConfirmBookingModalComponent
  ],
  imports: [
    CommonModule,
    CoachRoutingModule,
    MatCardModule,
    MatIconModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTooltipModule,
    SharedCardComponent,
    MatDialogModule,
    MatToolbarModule
  ],
})
export class CoachHomepageModule {
}
