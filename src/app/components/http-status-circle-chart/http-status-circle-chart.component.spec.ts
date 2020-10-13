import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeMapService } from 'src/app/services/tree-map.service';

import { HttpStatusCircleChartComponent } from './http-status-circle-chart.component';

describe('HttpStatusCircleChartComponent', () => {
  let component: HttpStatusCircleChartComponent;
  let fixture: ComponentFixture<HttpStatusCircleChartComponent>;
  let service: TreeMapService;
  class MockTreeMapService {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpStatusCircleChartComponent,
        { provide: TreeMapService, useClass: MockTreeMapService }]
    });
    component = TestBed.inject(HttpStatusCircleChartComponent);
    service = TestBed.inject(TreeMapService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
