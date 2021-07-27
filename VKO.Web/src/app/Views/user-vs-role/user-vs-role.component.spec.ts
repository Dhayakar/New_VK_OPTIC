import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVsRoleComponent } from './user-vs-role.component';

describe('UserVsRoleComponent', () => {
  let component: UserVsRoleComponent;
  let fixture: ComponentFixture<UserVsRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVsRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVsRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
