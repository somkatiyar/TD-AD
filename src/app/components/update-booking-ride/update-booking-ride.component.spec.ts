import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookingRideComponent } from './update-booking-ride.component';

describe('UpdateBookingRideComponent', () => {
  let component: UpdateBookingRideComponent;
  let fixture: ComponentFixture<UpdateBookingRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBookingRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBookingRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
