import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { SwaggerService } from './swagger.service';

describe('SwaggerService', () => {
  let service: SwaggerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwaggerService],
      imports: [
        HttpClientTestingModule
      ],
    });
  });

  it('should be created',
    inject([HttpTestingController, SwaggerService],
      (httpMock: HttpTestingController, service: SwaggerService) => {
        expect(service).toBeTruthy();
      }));
});
