import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LeftColumnComponent } from './left-column.component';

describe('LeftColumnComponent', () => {
  let component: LeftColumnComponent;
  let fixture: ComponentFixture<LeftColumnComponent>;
  let store: MockStore;
  const initialState = { graph: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [LeftColumnComponent]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
