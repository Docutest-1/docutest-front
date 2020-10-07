import { async, ComponentFixture, TestBed, inject, getTestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { TempFileUploadComponent } from './temp-file-upload.component';

describe('TempFileUploadComponent', () => {
  let component: TempFileUploadComponent;
  let fixture: ComponentFixture<TempFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TempFileUploadComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
