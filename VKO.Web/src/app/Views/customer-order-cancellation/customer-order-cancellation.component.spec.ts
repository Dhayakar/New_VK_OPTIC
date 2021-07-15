import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderCancellationComponent } from './customer-order-cancellation.component';

describe('CustomerOrderCancellationComponent', () => {
  let component: CustomerOrderCancellationComponent;
  let fixture: ComponentFixture<CustomerOrderCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
