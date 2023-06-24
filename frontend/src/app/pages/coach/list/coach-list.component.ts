import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService } from '../../../core/services/cache.service';
import { Coach } from '../../../core/models/coach.model';
import { CardData } from '../../../shared/card/shared-card.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cs-coach-list',
  templateUrl: './coach-list.component.html'
})
export class CoachListComponent {


  coaches$: Observable<Coach[]> = this.cacheService.getCachedCoaches();

  constructor(private readonly cacheService: CacheService,
              private router: Router,
              private route: ActivatedRoute) {}


  onCoachClicked(coach: CardData) {
    this.navigateToCoach(coach as Coach);
  }

  private navigateToCoach(coach: Coach) {
    this.router.navigate([coach.id], { relativeTo: this.route });
  }
}
