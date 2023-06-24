import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBookingModalComponent } from './student-booking-modal.component';

describe('StudentBookingModalComponent', () => {
  let component: StudentBookingModalComponent;
  let fixture: ComponentFixture<StudentBookingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentBookingModalComponent]
    });
    fixture = TestBed.createComponent(StudentBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
