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
import { CoachActionModalComponent } from './overview/action-modal/coach-action-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { CoachLessonHistoryComponent } from './overview/coach-lesson-history/coach-lesson-history.component';


@NgModule({
  declarations: [
    CoachHomepageComponent,
    CoachListComponent,
    CoachOverview,
    CoachAvailabilityComponent,
    FilterStatusGroupByDatePipe,
    CoachActionModalComponent,
    CoachLessonHistoryComponent,
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
    MatDialogModule,
    MatToolbarModule,
    SharedModule
  ],
})
export class CoachHomepageModule {
}
