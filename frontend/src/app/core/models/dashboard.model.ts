import { Coach } from './coach.model';
import { Student } from './student.model';
import { Slot } from './slot.model';

export interface ViewMode {
  icon: string;
  entity: EntityType;
  routerLink: string;
}

export enum EntityType {
  COACH = 'Coach',
  STUDENT = 'Student'
}

export interface EntityModalData {
  entity: EntityType,
  entityData: Coach | Student
  isCreateMode: boolean;
}


export interface StudentBookingModalData {
  coach: Coach;
  student: Student
  availabilities: Slot[]
}

export interface BookingConfirmModalData {
  coachId: number;
  slots: Slot[]
}
