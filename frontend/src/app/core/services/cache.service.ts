import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Coach } from '../models/coach.model';
import { CoachService } from './coach.service';
import { Student } from '../models/student.model';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private coaches$: Observable<Coach[]>;
  private students$: Observable<Student[]>;


  constructor(
    private coachService: CoachService,
    private studentService: StudentService
  ) {
    this.cacheCoaches();
    this.cacheStudents()
  }

  getCachedCoaches(): Observable<Coach[]> {
    return this.coaches$;
  }

  getCachedStudents(): Observable<Student[]> {
    return this.students$;
  }

  private cacheCoaches(): void {
    this.coaches$ = this.coachService.getAllCoaches().pipe(
      shareReplay())
  }

  private cacheStudents(): void {
    this.students$ = this.studentService.getAllStudents().pipe(
      shareReplay())
  }

}
