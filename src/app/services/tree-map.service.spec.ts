import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TreeMapService } from './tree-map.service';

describe('TreeMapService', () => {
  let service: TreeMapService;
  let http: HttpClient;
  class MockHttpClient {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeMapService,
        { provide: HttpClient, useClass: MockHttpClient }]
    });
    service = TestBed.inject(TreeMapService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
