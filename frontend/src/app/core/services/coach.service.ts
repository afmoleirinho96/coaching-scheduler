import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Coach, CreateCoachRequest } from '../models/coach.model';
import { Slot } from '../models/slot.model';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient) { }


  getAllCoaches(): Observable<Coach[]> {
    return this.http.get<any>(`${environment.apiUrl}/coaches`);
  }

  getCoachById(id: number): Observable<Coach> {
    return this.http.get<any>(`${environment.apiUrl}/coaches/${id}`).pipe(
      map((coach: Coach) => {
        return {
          ...coach,
          slots: coach.slots.map((slot: Slot) => ( {
            ...slot,
            startTime: new Date(slot.startTime),
            endTime: new Date(slot.endTime)
          } ))
        };
      })
    );
  }

  createCoach(createCoachDto: CreateCoachRequest): Observable<Coach> {
    return this.http.post<Coach>(`${environment.apiUrl}/coaches`, createCoachDto);
  }
}
