import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialreturntovendorComponent } from './materialreturntovendor.component';

describe('MaterialreturntovendorComponent', () => {
  let component: MaterialreturntovendorComponent;
  let fixture: ComponentFixture<MaterialreturntovendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialreturntovendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialreturntovendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
