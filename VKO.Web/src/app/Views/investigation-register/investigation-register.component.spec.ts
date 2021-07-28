import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationRegisterComponent } from './investigation-register.component';

describe('InvestigationRegisterComponent', () => {
  let component: InvestigationRegisterComponent;
  let fixture: ComponentFixture<InvestigationRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});




