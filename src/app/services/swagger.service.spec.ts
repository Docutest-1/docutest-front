import { TestBed } from '@angular/core/testing';

import { SwaggerService } from './swagger.service';

describe('SwaggerService', () => {
  let service: SwaggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwaggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
