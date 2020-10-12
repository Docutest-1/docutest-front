import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ResultsSummaryComponent } from './results-summary.component';

describe('ResultsSummaryComponent', () => {
  let component: ResultsSummaryComponent;
  let router: Router;

  class MockRouter {

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultsSummaryComponent, { provide: Router, useClass: MockRouter }],
    });
    component = TestBed.inject(ResultsSummaryComponent);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    component = null;
    router = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
