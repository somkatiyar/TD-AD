import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCenterManagementComponent } from './test-center-management.component';

describe('TestCenterManagementComponent', () => {
  let component: TestCenterManagementComponent;
  let fixture: ComponentFixture<TestCenterManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCenterManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCenterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
