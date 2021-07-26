import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmasterComponent } from './locationmaster.component';

describe('LocationmasterComponent', () => {
  let component: LocationmasterComponent;
  let fixture: ComponentFixture<LocationmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
