import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeartypeComponent } from './geartype.component';

describe('GeartypeComponent', () => {
  let component: GeartypeComponent;
  let fixture: ComponentFixture<GeartypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeartypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeartypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
