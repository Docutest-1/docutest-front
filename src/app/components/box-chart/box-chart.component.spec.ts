import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeMapService } from 'src/app/services/tree-map.service';

import { BoxChartComponent } from './box-chart.component';

describe('BoxChartComponent', () => {
  let component: BoxChartComponent;
  let fixture: ComponentFixture<BoxChartComponent>;
  let service: TreeMapService;
  class MockTreeMapService {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoxChartComponent, { provide: TreeMapService, useClass: MockTreeMapService }]
    });
    component = TestBed.inject(BoxChartComponent);
    service = TestBed.inject(TreeMapService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
