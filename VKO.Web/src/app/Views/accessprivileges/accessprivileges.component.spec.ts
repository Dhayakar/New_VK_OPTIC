import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessprivilegesComponent } from './accessprivileges.component';

describe('AccessprivilegesComponent', () => {
  let component: AccessprivilegesComponent;
  let fixture: ComponentFixture<AccessprivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessprivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessprivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
