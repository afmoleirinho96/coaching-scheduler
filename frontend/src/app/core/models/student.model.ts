import { Slot } from './slot.model';

export interface Student {
  id: number;
  name: string;
  email: string;
  slots: Slot[]
  createdAt: Date
}

export interface CreateStudentRequest {
  name: string;
  email: string;
}
