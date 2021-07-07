import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticalStockSummaryComponent } from './optical-stock-summary.component';

describe('OpticalStockSummaryComponent', () => {
  let component: OpticalStockSummaryComponent;
  let fixture: ComponentFixture<OpticalStockSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpticalStockSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpticalStockSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
