import { Slot } from './slot.model';

export interface Coach {
  id: number;
  name: string;
  email: string;
  slots: Slot[]
  expertises?: string[];
  createdAt: Date
}


export interface CreateCoachRequest {
  name: string;
  email: string;
  expertises?: string[];
}
