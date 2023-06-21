import { Slot } from './slot.model';

export interface Coach {
  id: number;
  name: string;
  email: string;
  slots: Slot[]
  expertises: string[]; // TODO - Add expertises for coaches
  createdAt: Date
}
