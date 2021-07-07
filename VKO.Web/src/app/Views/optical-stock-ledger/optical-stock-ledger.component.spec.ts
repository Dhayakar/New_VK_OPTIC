import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticalStockLedgerComponent } from './optical-stock-ledger.component';

describe('OpticalStockLedgerComponent', () => {
  let component: OpticalStockLedgerComponent;
  let fixture: ComponentFixture<OpticalStockLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpticalStockLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpticalStockLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
