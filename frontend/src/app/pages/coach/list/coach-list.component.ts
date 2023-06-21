import { Component } from '@angular/core';
import { CoachService } from '../../../core/services/coach.service';
import { Observable } from 'rxjs';
import { CacheService } from '../../../core/services/cache.service';
import { Coach } from '../../../core/models/coach.model';

@Component({
  selector: 'cs-coach-list',
  templateUrl: './coach-list.component.html'
})
export class CoachListComponent {


  coaches$: Observable<Coach[]> = this.cacheService.getCachedCoaches();

  constructor(private readonly coachService: CoachService,
              private readonly cacheService: CacheService) {}


}
