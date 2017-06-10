import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotBarComponent } from './plot-bar.component';

describe('PlotBarComponent', () => {
  let component: PlotBarComponent;
  let fixture: ComponentFixture<PlotBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
