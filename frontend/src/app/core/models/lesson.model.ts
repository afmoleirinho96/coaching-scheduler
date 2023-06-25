import { Slot } from './slot.model';
import { Coach } from './coach.model';
import { Student } from './student.model';

export interface LessonRequest {
  slot: Slot
}

export interface Lesson {
  id: number;
  coach: Coach;
  student: Student;
  slot: Slot
  satisfactionScore?: number;
  coachNotes?: string;
}

export class LessonGroupedByDate {
  dateDay: string;
  lessons: Lesson[];
}

export interface UpdateLessonRequest {
  satisfactionScore?: number;
  coachNotes?: string;
}
