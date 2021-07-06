import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LensMasterComponent } from './lens-master.component';

describe('LensMasterComponent', () => {
  let component: LensMasterComponent;
  let fixture: ComponentFixture<LensMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LensMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LensMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
