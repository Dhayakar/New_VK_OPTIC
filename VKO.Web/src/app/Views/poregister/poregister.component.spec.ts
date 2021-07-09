import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoregisterComponent } from './poregister.component';

describe('PoregisterComponent', () => {
  let component: PoregisterComponent;
  let fixture: ComponentFixture<PoregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
