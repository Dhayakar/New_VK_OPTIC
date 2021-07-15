import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerevenueComponent } from './servicerevenue.component';

describe('ServicerevenueComponent', () => {
  let component: ServicerevenueComponent;
  let fixture: ComponentFixture<ServicerevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicerevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicerevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
