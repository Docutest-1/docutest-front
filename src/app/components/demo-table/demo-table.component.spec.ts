/* eslint-disable prefer-const */
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { SwaggerService } from 'src/app/services/swagger.service';

import { DemoTableComponent } from './demo-table.component';

describe('DemoTableComponent', () => {
  let component: DemoTableComponent;
  let service: SwaggerService;

  class MockSwaggerService {

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoTableComponent, { provide: SwaggerService, useClass: MockSwaggerService }],
    });
    component = TestBed.inject(DemoTableComponent);
    service = TestBed.inject(SwaggerService);
  });

  afterEach(() => {
    component = null;
    service = null;
  });

  it('should be created', async () => {
    expect(component).toBeTruthy();
  });
});
