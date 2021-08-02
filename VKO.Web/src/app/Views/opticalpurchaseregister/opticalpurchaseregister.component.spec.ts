import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticalpurchaseregisterComponent } from './opticalpurchaseregister.component';

describe('OpticalpurchaseregisterComponent', () => {
  let component: OpticalpurchaseregisterComponent;
  let fixture: ComponentFixture<OpticalpurchaseregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpticalpurchaseregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpticalpurchaseregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
