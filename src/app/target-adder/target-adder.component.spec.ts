import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAdderComponent } from './target-adder.component';

describe('TargetAdderComponent', () => {
  let component: TargetAdderComponent;
  let fixture: ComponentFixture<TargetAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
