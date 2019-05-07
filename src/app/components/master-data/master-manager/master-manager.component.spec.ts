import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterManagerComponent } from './master-manager.component';

describe('MasterManagerComponent', () => {
  let component: MasterManagerComponent;
  let fixture: ComponentFixture<MasterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
