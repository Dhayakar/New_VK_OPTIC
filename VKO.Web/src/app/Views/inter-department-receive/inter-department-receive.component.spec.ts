import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterDepartmentReceiveComponent } from './inter-department-receive.component';

describe('InterDepartmentReceiveComponent', () => {
  let component: InterDepartmentReceiveComponent;
  let fixture: ComponentFixture<InterDepartmentReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterDepartmentReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterDepartmentReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
