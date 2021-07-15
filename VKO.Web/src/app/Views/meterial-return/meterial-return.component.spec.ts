import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterialReturnComponent } from './meterial-return.component';

describe('MeterialReturnComponent', () => {
  let component: MeterialReturnComponent;
  let fixture: ComponentFixture<MeterialReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterialReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterialReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
