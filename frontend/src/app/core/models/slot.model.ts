export interface SlotsRequestBody {
  slots: SlotRequest[];
}

export interface SlotRequest {
  startTime: Date;
  endTime: Date;
}

export interface Slot {
  id: string;
  startTime: Date;
  endTime: Date;
  status: SlotStatus
}

export enum SlotStatus {
  Available = 'available',
  Booked = 'booked',
  Scheduled = 'scheduled',
  Past = 'past',
}
