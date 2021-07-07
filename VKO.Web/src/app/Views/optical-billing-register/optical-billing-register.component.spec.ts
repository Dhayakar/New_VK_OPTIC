import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticalBillingRegisterComponent } from './optical-billing-register.component';

describe('OpticalBillingRegisterComponent', () => {
  let component: OpticalBillingRegisterComponent;
  let fixture: ComponentFixture<OpticalBillingRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpticalBillingRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpticalBillingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
