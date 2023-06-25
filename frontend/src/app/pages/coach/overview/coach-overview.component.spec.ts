import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachOverview } from './coach-overview.component';

describe('CoachDetailsComponent', () => {
  let component: CoachOverview;
  let fixture: ComponentFixture<CoachOverview>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachOverview]
    });
    fixture = TestBed.createComponent(CoachOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
