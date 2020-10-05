import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempFileUploadComponent } from './temp-file-upload.component';

describe('TempFileUploadComponent', () => {
  let component: TempFileUploadComponent;
  let fixture: ComponentFixture<TempFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempFileUploadComponent ]
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
