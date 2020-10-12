import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssDashboardComponent } from './css-dashboard.component';

describe('CssDashboardComponent', () => {
  let component: CssDashboardComponent;
  let fixture: ComponentFixture<CssDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CssDashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CssDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
