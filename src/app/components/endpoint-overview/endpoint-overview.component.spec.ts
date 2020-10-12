import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointOverviewComponent } from './endpoint-overview.component';

describe('EndpointOverviewComponent', () => {
  let component: EndpointOverviewComponent;
  let fixture: ComponentFixture<EndpointOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointOverviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
