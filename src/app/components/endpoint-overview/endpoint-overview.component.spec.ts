import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeMapService } from 'src/app/services/tree-map.service';

import { EndpointOverviewComponent } from './endpoint-overview.component';

describe('EndpointOverviewComponent', () => {
  let component: EndpointOverviewComponent;
  let fixture: ComponentFixture<EndpointOverviewComponent>;
  let service: TreeMapService;
  class MockTreeMapService {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndpointOverviewComponent,
        { provide: TreeMapService, useClass: MockTreeMapService }]
    });
    component = TestBed.inject(EndpointOverviewComponent);
    service = TestBed.inject(TreeMapService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
