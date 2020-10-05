import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTableComponent } from './http-table.component';

describe('HttpTableComponent', () => {
  let component: HttpTableComponent;
  let fixture: ComponentFixture<HttpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HttpTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
