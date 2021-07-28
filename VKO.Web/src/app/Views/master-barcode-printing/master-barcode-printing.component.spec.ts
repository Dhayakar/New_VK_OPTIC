import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBarcodePrintingComponent } from './master-barcode-printing.component';

describe('MasterBarcodePrintingComponent', () => {
  let component: MasterBarcodePrintingComponent;
  let fixture: ComponentFixture<MasterBarcodePrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBarcodePrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBarcodePrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
