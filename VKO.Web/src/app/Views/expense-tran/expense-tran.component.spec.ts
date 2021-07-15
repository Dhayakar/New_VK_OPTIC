import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTranComponent } from './expense-tran.component';

describe('ExpenseTranComponent', () => {
  let component: ExpenseTranComponent;
  let fixture: ComponentFixture<ExpenseTranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
