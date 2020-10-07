import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let store: MockStore;
  const initialState = { graph: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DropdownComponent,
        provideMockStore({ initialState })
      ]
    });

    store = TestBed.inject(MockStore);
    component = TestBed.inject(DropdownComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
