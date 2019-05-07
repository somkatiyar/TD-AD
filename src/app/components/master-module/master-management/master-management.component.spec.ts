import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterManagementComponent } from './master-management.component';

describe('MasterManagementComponent', () => {
  let component: MasterManagementComponent;
  let fixture: ComponentFixture<MasterManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
