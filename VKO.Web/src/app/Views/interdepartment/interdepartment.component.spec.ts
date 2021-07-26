import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterdepartmentComponent } from './interdepartment.component';

describe('InterdepartmentComponent', () => {
  let component: InterdepartmentComponent;
  let fixture: ComponentFixture<InterdepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterdepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
