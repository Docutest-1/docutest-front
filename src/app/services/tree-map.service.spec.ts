import { TestBed } from '@angular/core/testing';

import { TreeMapService } from './tree-map.service';

describe('TreeMapService', () => {
  let service: TreeMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
