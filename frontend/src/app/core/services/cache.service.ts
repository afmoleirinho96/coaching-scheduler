import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coach } from '../models/coach.model';
import { CoachService } from './coach.service';
import { Student } from '../models/student.model';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private coaches$: BehaviorSubject<Coach[]> = new BehaviorSubject<Coach[]>([]);
  private students$: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);


  constructor(
    private coachService: CoachService,
    private studentService: StudentService
  ) {
    this.cacheCoaches();
    this.cacheStudents()
  }

  getCachedCoaches(): Observable<Coach[]> {
    return this.coaches$.asObservable();
  }

  updateCoaches(newCoach: Coach): void {
    const currentCoaches = this.coaches$.getValue();
    const updatedCoaches = [...currentCoaches, newCoach];
    this.coaches$.next(updatedCoaches);
  }

  getCachedStudents(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  updateStudents(newStudent: Student): void {
    const currentStudents = this.students$.getValue();
    const updatedStudents = [...currentStudents, newStudent];
    this.students$.next(updatedStudents);
  }

  private cacheCoaches(): void {
    this.coachService.getAllCoaches()
      .subscribe(coaches => this.coaches$.next(coaches));
  }

  private cacheStudents(): void {
    this.studentService.getAllStudents()
      .subscribe(students => this.students$.next(students));
  }

}
