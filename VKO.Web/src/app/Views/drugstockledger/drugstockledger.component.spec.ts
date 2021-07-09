import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugstockledgerComponent } from './drugstockledger.component';

describe('DrugstockledgerComponent', () => {
  let component: DrugstockledgerComponent;
  let fixture: ComponentFixture<DrugstockledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugstockledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugstockledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
