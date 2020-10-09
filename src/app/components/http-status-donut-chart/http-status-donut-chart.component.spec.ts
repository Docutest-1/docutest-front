import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpStatusDonutChartComponent } from './http-status-donut-chart.component';

describe('HttpStatusDonutChartComponent', () => {
  let component: HttpStatusDonutChartComponent;
  let fixture: ComponentFixture<HttpStatusDonutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HttpStatusDonutChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpStatusDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
