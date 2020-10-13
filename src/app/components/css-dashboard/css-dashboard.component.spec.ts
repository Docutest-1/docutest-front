/* eslint-disable max-classes-per-file */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TreeMapService } from 'src/app/services/tree-map.service';

import { CssDashboardComponent } from './css-dashboard.component';

describe('CssDashboardComponent', () => {
  let component: CssDashboardComponent;
  let fixture: ComponentFixture<CssDashboardComponent>;
  let service: TreeMapService;
  let router: Router;
  class MockRouter {}
  class MockTreeMapService {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CssDashboardComponent,
        { provide: TreeMapService, useClass: MockTreeMapService },
        { provide: Router, useClass: MockRouter }]
    });
    component = TestBed.inject(CssDashboardComponent);
    service = TestBed.inject(TreeMapService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
