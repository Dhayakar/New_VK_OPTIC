import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensestatementComponent } from './expensestatement.component';

describe('ExpensestatementComponent', () => {
  let component: ExpensestatementComponent;
  let fixture: ComponentFixture<ExpensestatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensestatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensestatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
