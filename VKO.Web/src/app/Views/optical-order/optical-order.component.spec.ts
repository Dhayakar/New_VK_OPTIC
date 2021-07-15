import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticalOrderComponent } from './optical-order.component';

describe('OpticalOrderComponent', () => {
  let component: OpticalOrderComponent;
  let fixture: ComponentFixture<OpticalOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpticalOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpticalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
