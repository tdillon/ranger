import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsFreshnessComponent } from './gps-freshness.component';

describe('GpsFreshnessComponent', () => {
  let component: GpsFreshnessComponent;
  let fixture: ComponentFixture<GpsFreshnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsFreshnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsFreshnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
