import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { POCANCELLATIONPRINTComponent } from './pocancellationprint.component';

describe('POCANCELLATIONPRINTComponent', () => {
  let component: POCANCELLATIONPRINTComponent;
  let fixture: ComponentFixture<POCANCELLATIONPRINTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ POCANCELLATIONPRINTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(POCANCELLATIONPRINTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
