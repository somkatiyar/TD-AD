import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDriverManagementComponent } from './school-driver-management.component';

describe('SchoolDriverManagementComponent', () => {
  let component: SchoolDriverManagementComponent;
  let fixture: ComponentFixture<SchoolDriverManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDriverManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDriverManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
