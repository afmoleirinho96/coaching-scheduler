import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachConfirmBookingModalComponent } from './coach-confirm-booking-modal.component';

describe('CoachConfirmBookingModalComponent', () => {
  let component: CoachConfirmBookingModalComponent;
  let fixture: ComponentFixture<CoachConfirmBookingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachConfirmBookingModalComponent]
    });
    fixture = TestBed.createComponent(CoachConfirmBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
