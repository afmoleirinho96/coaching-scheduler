import { Coach } from './coach.model';
import { Student } from './student.model';
import { Slot } from './slot.model';
import { ActionType } from '../../pages/coach/overview/coach-overview.component';

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
}

export interface StudentBookingModalData {
  coach: Coach;
  student: Student
  availabilities: Slot[]
}

export interface CoachActionModalData {
  coachId: number;
  slots: Slot[]
  title: string;
  description: string;
  actionType: ActionType

}
