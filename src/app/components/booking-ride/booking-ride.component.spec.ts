import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRideComponent } from './booking-ride.component';

describe('BookingRideComponent', () => {
  let component: BookingRideComponent;
  let fixture: ComponentFixture<BookingRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
