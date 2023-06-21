import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coach } from '../../../core/models/coach.model';

@Component({
  selector: 'cs-coach-card',
  templateUrl: './coach-card.component.html'
})

export class CoachCardComponent {

  @Input() coach: Coach;

  defaultAvatar = 'assets/images/avatar_student.svg';


  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToCoach(coach: Coach) {
    this.router.navigate([coach.id], { relativeTo: this.route });
  }
}
