import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnathorizedComponent } from './unathorized.component';

describe('UnathorizedComponent', () => {
  let component: UnathorizedComponent;
  let fixture: ComponentFixture<UnathorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnathorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnathorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
