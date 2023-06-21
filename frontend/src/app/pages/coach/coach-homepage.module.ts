import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CoachHomepageComponent } from './coach-homepage/coach-homepage.component';
import { CoachHomepageRoutingModule } from './coach-homepage-routing.module';
import { CoachListComponent } from './list/coach-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CoachCardComponent } from './card/coach-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoachDetailsComponent } from './details/coach-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoachAvailabilityComponent } from './details/availability/coach-availability.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { FilterStatusGroupByDatePipe } from '../../pipes/slot-filter.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [CoachHomepageComponent, CoachListComponent, CoachCardComponent, CoachDetailsComponent, CoachAvailabilityComponent, FilterStatusGroupByDatePipe],
  imports: [
    CommonModule,
    CoachHomepageRoutingModule,
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

  ]
})
export class CoachHomepageModule {
}
