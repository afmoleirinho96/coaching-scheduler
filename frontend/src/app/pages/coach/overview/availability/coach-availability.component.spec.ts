import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAvailabilityComponent } from './coach-availability.component';

describe('CoachAvailabilityComponent', () => {
  let component: CoachAvailabilityComponent;
  let fixture: ComponentFixture<CoachAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachAvailabilityComponent]
    });
    fixture = TestBed.createComponent(CoachAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
