import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Slot } from '../models/slot.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }


  getAllStudents(): Observable<Student[]> {
    return this.http.get<any>(`${environment.apiUrl}/students`);
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<any>(`${environment.apiUrl}/students/${id}`).pipe(
      map((student: Student) => {
        return {
          ...student,
          slots: student.slots.map((slot: Slot) => ( {
            ...slot,
            startTime: new Date(slot.startTime),
            endTime: new Date(slot.endTime)
          } ))
        };
      })
    );
  }
}
