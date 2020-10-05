import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLoadTestWidgetComponent } from './start-load-test-widget.component';

describe('StartLoadTestWidgetComponent', () => {
  let component: StartLoadTestWidgetComponent;
  let fixture: ComponentFixture<StartLoadTestWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartLoadTestWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLoadTestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
