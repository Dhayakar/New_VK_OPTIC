import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocanncelledregisterComponent } from './pocanncelledregister.component';

describe('PocanncelledregisterComponent', () => {
  let component: PocanncelledregisterComponent;
  let fixture: ComponentFixture<PocanncelledregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocanncelledregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocanncelledregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
