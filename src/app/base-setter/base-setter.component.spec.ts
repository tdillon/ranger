import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSetterComponent } from './base-setter.component';

describe('BaseSetterComponent', () => {
  let component: BaseSetterComponent;
  let fixture: ComponentFixture<BaseSetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
