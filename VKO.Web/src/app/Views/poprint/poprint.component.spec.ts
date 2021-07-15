import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { POPRINTComponent } from './poprint.component';

describe('POPRINTComponent', () => {
  let component: POPRINTComponent;
  let fixture: ComponentFixture<POPRINTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ POPRINTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(POPRINTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
