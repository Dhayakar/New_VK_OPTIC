import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticalGrnComponent } from './optical-grn.component';

describe('OpticalGrnComponent', () => {
  let component: OpticalGrnComponent;
  let fixture: ComponentFixture<OpticalGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpticalGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpticalGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
