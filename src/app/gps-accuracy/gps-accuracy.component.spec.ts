import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsAccuracyComponent } from './gps-accuracy.component';

describe('GpsAccuracyComponent', () => {
  let component: GpsAccuracyComponent;
  let fixture: ComponentFixture<GpsAccuracyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsAccuracyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsAccuracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
