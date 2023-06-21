import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Coach } from '../models/coach.model';
import { CoachService } from './coach.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private coaches$: Observable<Coach[]>;


  constructor(
    private coachService: CoachService,
  ) {
    this.cacheCoaches();
  }

  getCachedCoaches(): Observable<Coach[]> {
    return this.coaches$;
  }

  private cacheCoaches(): void {
    this.coaches$ = this.coachService.getAllCoaches().pipe(
      shareReplay())
  }

}
