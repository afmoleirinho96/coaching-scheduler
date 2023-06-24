export interface SlotsAvailableRequest {
  slots: SlotAvailableRequest[];
}

export interface SlotAvailableRequest {
  startTime: Date;
  endTime: Date;
}

export interface SlotsBookedRequest {
  slotIds: number[];
}

export interface SlotScheduleRequest {
  slotIds: string[];
}

export interface Slot {
  id: string;
  startTime: Date;
  endTime: Date;
  status: SlotStatus;
  coachId: number;
  studentId: number;
}

export enum SlotStatus {
  Available = 'available',
  Booked = 'booked',
  Scheduled = 'scheduled',
  Past = 'past',
}
