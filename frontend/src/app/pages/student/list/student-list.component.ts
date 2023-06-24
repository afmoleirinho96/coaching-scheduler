import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService } from '../../../core/services/cache.service';
import { Student } from '../../../core/models/student.model';
import { CardData } from '../../../shared/card/shared-card.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cs-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {


  students$: Observable<Student[]> = this.cacheService.getCachedStudents();

  constructor(private readonly cacheService: CacheService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  onStudentClicked(student: CardData) {
    this.navigateToCoach(student as Student);
  }


  private navigateToCoach(student: Student) {
    this.router.navigate([student.id], { relativeTo: this.route });
  }

}
