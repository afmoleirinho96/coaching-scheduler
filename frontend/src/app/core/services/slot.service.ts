import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Slot, SlotsAvailableRequest, SlotsBookedRequest, SlotScheduleRequest } from '../models/slot.model';

@Injectable({
  providedIn: 'root'
})
export class SlotService {


  constructor(private http: HttpClient) { }

  markSlotsAsAvailable(coachId: number, body: SlotsAvailableRequest): Observable<Slot[]> {
    return this.http.patch<Slot[]>(`${environment.apiUrl}/coaches/${coachId}/available-slots`, body)
      .pipe(map(slots => slots.map(slot => ( {
        ...slot,
        startTime: new Date(slot.startTime),
        endTime: new Date(slot.endTime)
      } ))));
  }

  markSlotsAsBooked(studentId: number, body: SlotsBookedRequest): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/students/${studentId}/book-slots`, body);
  }

  markSlotsAsScheduled(coachId: number, body: SlotScheduleRequest): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/coaches/${coachId}/schedule-slots`, body);
  }

}
