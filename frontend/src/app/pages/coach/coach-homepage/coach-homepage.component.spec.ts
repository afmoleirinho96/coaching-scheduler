import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachHomepageComponent } from './coach-homepage.component';

describe('CoachHomepageComponent', () => {
  let component: CoachHomepageComponent;
  let fixture: ComponentFixture<CoachHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachHomepageComponent]
    });
    fixture = TestBed.createComponent(CoachHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
