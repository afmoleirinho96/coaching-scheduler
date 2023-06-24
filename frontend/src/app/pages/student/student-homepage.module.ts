import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomepageComponent } from './homepage/student-homepage.component';
import { StudentHomepageRoutingModule } from './homepage/student-homepage-routing.module';
import { StudentListComponent } from './list/student-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedCardComponent } from '../../shared/card/shared-card.component';
import { StudentBookingComponent } from './booking/student-booking.component';
import { StudentRoutingModule } from './student-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { StudentBookingModalComponent } from './booking/booking-modal/student-booking-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [StudentHomepageComponent, StudentListComponent, StudentBookingComponent, StudentBookingModalComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    StudentHomepageRoutingModule,
    MatProgressSpinnerModule,
    SharedCardComponent,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule,
    SharedCardComponent
  ]
})
export class StudentHomepageModule { }
