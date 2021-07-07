import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { POCANCELLATIONComponent } from './pocancellation.component';

describe('POCANCELLATIONComponent', () => {
  let component: POCANCELLATIONComponent;
  let fixture: ComponentFixture<POCANCELLATIONComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ POCANCELLATIONComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(POCANCELLATIONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
