import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GRNwithoutpoComponent } from './grnwithoutpo.component';

describe('GRNwithoutpoComponent', () => {
  let component: GRNwithoutpoComponent;
  let fixture: ComponentFixture<GRNwithoutpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GRNwithoutpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GRNwithoutpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
