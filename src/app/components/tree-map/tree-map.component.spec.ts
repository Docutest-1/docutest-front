import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeMapService } from 'src/app/services/tree-map.service';

import { TreeMapComponent } from './tree-map.component';

describe('TreeMapComponent', () => {
  let component: TreeMapComponent;
  let fixture: ComponentFixture<TreeMapComponent>;
  let service: TreeMapService;

  class MockTreeMapService {

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeMapComponent, { provide: TreeMapService, useClass: MockTreeMapService }]
    });
    component = TestBed.inject(TreeMapComponent);
    service = TestBed.inject(TreeMapService);
  });

  afterEach(() => {
    component = null;
    service = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
