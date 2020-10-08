import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericD3Component } from './generic-d3.component';

describe('GenericD3Component', () => {
  let component: GenericD3Component;
  let fixture: ComponentFixture<GenericD3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericD3Component]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
