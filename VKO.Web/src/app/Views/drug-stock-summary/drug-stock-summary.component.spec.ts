import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugStockSummaryComponent } from './drug-stock-summary.component';

describe('DrugStockSummaryComponent', () => {
  let component: DrugStockSummaryComponent;
  let fixture: ComponentFixture<DrugStockSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugStockSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugStockSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
