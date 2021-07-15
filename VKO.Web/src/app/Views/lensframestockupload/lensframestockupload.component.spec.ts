import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LensframestockuploadComponent } from './lensframestockupload.component';

describe('LensframestockuploadComponent', () => {
  let component: LensframestockuploadComponent;
  let fixture: ComponentFixture<LensframestockuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LensframestockuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LensframestockuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
