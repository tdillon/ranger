import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotBarSwitcherComponent } from './plot-bar-switcher.component';

describe('PlotBarSwitcherComponent', () => {
  let component: PlotBarSwitcherComponent;
  let fixture: ComponentFixture<PlotBarSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotBarSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotBarSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
