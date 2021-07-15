import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentFormComponent } from './indent-form.component';

describe('IndentFormComponent', () => {
  let component: IndentFormComponent;
  let fixture: ComponentFixture<IndentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
