import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupmasterComponent } from './setupmaster.component';

describe('SetupmasterComponent', () => {
  let component: SetupmasterComponent;
  let fixture: ComponentFixture<SetupmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
