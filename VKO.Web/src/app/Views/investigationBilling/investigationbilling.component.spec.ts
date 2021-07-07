import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationBillingComponent } from './investigationbilling.component';

describe('InvestigationBillingComponent', () => {
  let component: InvestigationBillingComponent;
  let fixture: ComponentFixture<InvestigationBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestigationBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
