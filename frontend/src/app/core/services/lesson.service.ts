import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Lesson, LessonGroupedByDate, LessonRequest, UpdateLessonRequest } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  createLesson(createLessonDto: LessonRequest): Observable<Lesson> {
    return this.http.post<Lesson>(`${environment.apiUrl}/lessons/`, createLessonDto);
  }

  getLessonsHistoryByCoachId(coachId: number): Observable<LessonGroupedByDate[]> {
    return this.http.get<LessonGroupedByDate[]>(`${environment.apiUrl}/lessons/coaches/${coachId}/history`);
  }

  updateLesson(lessonId: number, updateLesson: UpdateLessonRequest): Observable<Lesson> {
    return this.http.patch<Lesson>(`${environment.apiUrl}/lessons/${lessonId}`, updateLesson);
  }

}
