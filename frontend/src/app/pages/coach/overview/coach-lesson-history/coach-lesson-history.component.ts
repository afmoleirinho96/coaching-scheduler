import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../core/services/lesson.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Lesson, LessonGroupedByDate, UpdateLessonRequest } from '../../../../core/models/lesson.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidationError } from '../../../../core/models/error.model';

@Component({
  selector: 'cs-coach-lesson-history',
  templateUrl: './coach-lesson-history.component.html',
  host: { class: 'w-full overflow-hidden' },
})
export class CoachLessonHistoryComponent implements OnInit {

  lessonForms: { [key: number]: FormGroup } = {};

  lessons$: Observable<LessonGroupedByDate[]>;

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private fb: FormBuilder, private toastService: ToastrService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const coachId = params['id'];

      this.lessons$ = this.lessonService.getLessonsHistoryByCoachId(coachId).pipe(
        tap((lessons) => {
          this.initializeLessonForms(lessons);
        })
      );
    });
  }

  onNewRating(satisfactionScore: number, lesson: Lesson) {
    const requestBody: UpdateLessonRequest = {
      satisfactionScore
    }

    this.updateSatisfactionScore(lesson, requestBody);
  }

  saveNotes(lessonId: number) {
    const coachNotes = this.lessonForms[lessonId].value.notes;

    const requestBody: UpdateLessonRequest = {
      coachNotes
    }

    this.lessonService.updateLesson(lessonId, requestBody).subscribe(() => {
      this.toastService.success('Coach Notes updated successfully');
    })
  }

  private updateSatisfactionScore(lesson: Lesson, requestBody: UpdateLessonRequest) {
    this.lessonService.updateLesson(lesson.id, requestBody).pipe(
      catchError((result) => {
        const validationError: ValidationError = result.error;
        const errorMessage = validationError.message || 'Something went wrong. Please try again, otherwise contact the administrator.';
        this.toastService.error(errorMessage);
        return throwError(() => result);
      })).subscribe((lesson) => {
      this.showSuccessMessage(lesson);
    })
  }

  private showSuccessMessage(lesson: Lesson) {
    const successMessage = lesson.satisfactionScore === 5 ?
      `${lesson.satisfactionScore} / 5 - Great job! \n Your student's progress reflects your exceptional coaching skills. Keep up the excellent work!` :
      `${lesson.satisfactionScore} / 5 \n Keep up the good work! \n Your student is on a positive trajectory, and your coaching is making a difference.`;
    this.toastService.success(successMessage);
  }

  private initializeLessonForms(lessons: LessonGroupedByDate[]): void {
    lessons.forEach((group) => {
      group.lessons.forEach((lesson) => {
        this.lessonForms[lesson.id] = this.fb.group({
          notes: [lesson.coachNotes || '', [Validators.minLength(5)]],
        });
      });
    });
  }
}
