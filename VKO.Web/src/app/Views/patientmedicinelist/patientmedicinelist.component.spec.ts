import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientmedicinelistComponent } from './patientmedicinelist.component';

describe('PatientmedicinelistComponent', () => {
  let component: PatientmedicinelistComponent;
  let fixture: ComponentFixture<PatientmedicinelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientmedicinelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientmedicinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
