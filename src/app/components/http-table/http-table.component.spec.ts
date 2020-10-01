import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpTableComponent } from './http-table.component';

describe('HttpTableComponent', () => {
  let component: HttpTableComponent;
  let fixture: ComponentFixture<HttpTableComponent>;
  let store: MockStore;
  const initialState = { graph: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [HttpTableComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HttpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
