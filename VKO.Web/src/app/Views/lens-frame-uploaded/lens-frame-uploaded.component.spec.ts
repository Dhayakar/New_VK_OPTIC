import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LensFrameUploadedComponent } from './lens-frame-uploaded.component';

describe('LensFrameUploadedComponent', () => {
  let component: LensFrameUploadedComponent;
  let fixture: ComponentFixture<LensFrameUploadedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LensFrameUploadedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LensFrameUploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
