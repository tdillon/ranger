import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsTogglerComponent } from './gps-toggler.component';

describe('GpsTogglerComponent', () => {
  let component: GpsTogglerComponent;
  let fixture: ComponentFixture<GpsTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsTogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
