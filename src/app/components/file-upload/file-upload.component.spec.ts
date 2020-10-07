import { async, ComponentFixture, TestBed, inject, getTestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let httpMock: HttpClientTestingModule;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
