import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpStatusCircleChartComponent } from './http-status-circle-chart.component';

describe('HttpStatusCircleChartComponent', () => {
  let component: HttpStatusCircleChartComponent;
  let fixture: ComponentFixture<HttpStatusCircleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HttpStatusCircleChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpStatusCircleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
