import {
  async, ComponentFixture, TestBed, inject, getTestBed, fakeAsync
} from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Swag } from 'src/app/models/swag';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let httpMock: HttpClientTestingModule;
  let httpClient: HttpClient;
  let store: MockStore;
  const formBuilder: FormBuilder = new FormBuilder();
  const initialState = { graph: false };
  const fakeData = new Blob(['']);
  const fakeDataArr = new Array<Blob>();
  fakeDataArr.push(fakeData);
  const jsonFile = new File(fakeDataArr, 'fakeFile.json', { type: 'application/json' });
  const yamlFile = new File(fakeDataArr, 'fakeFile.yaml', { type: 'text/yaml' });
  const ymlFile = new File(fakeDataArr, 'fakeFile.yml', { type: 'text/yaml' });
  const swag = new Swag();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      providers: [FormBuilder, { useValue: formBuilder }, provideMockStore({ initialState })],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    store = TestBed.inject(MockStore);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit should equal to empty string', () => {
    component.uploadForm = formBuilder.group({
      swaggerFile: jsonFile,
    });
    fixture.detectChanges();

    expect(component.uploadForm.value).toEqual({ swaggerFile: '' });
  });

  it('should get file on upload, get extension from file name, and invoke json parser', () => {
    const mockEvt = { target: { files: [jsonFile] } };
    spyOn(component, 'jsonParser');
    spyOn(component, 'yamlParser');
    component.onFileSelect(mockEvt);

    expect(component.selectedFile).toEqual(mockEvt.target.files[0]);
    expect(mockEvt.target.files.length).toBeGreaterThan(0);
    expect(component.fileExt).toEqual('.json');
    expect(component.jsonParser).toHaveBeenCalledWith();
    expect(component.yamlParser).not.toHaveBeenCalled();
  });

  it('should get file on upload, get extension from file name, and invoke yaml parser', () => {
    const mockEvt = { target: { files: [yamlFile] } };
    spyOn(component, 'jsonParser');
    spyOn(component, 'yamlParser');
    component.onFileSelect(mockEvt);

    expect(component.selectedFile).toEqual(mockEvt.target.files[0]);
    expect(mockEvt.target.files.length).toBeGreaterThan(0);
    expect(component.fileExt).toEqual('.yaml');
    expect(component.jsonParser).not.toHaveBeenCalled();
    expect(component.yamlParser).toHaveBeenCalledWith();
  });

  it('should get file on upload, get extension from file name, and invoke yml parser', () => {
    const mockEvt = { target: { files: [ymlFile] } };
    spyOn(component, 'jsonParser');
    spyOn(component, 'yamlParser');
    component.onFileSelect(mockEvt);

    expect(component.selectedFile).toEqual(mockEvt.target.files[0]);
    expect(mockEvt.target.files.length).toBeGreaterThan(0);
    expect(component.fileExt).toEqual('.yml');
    expect(component.jsonParser).not.toHaveBeenCalled();
    expect(component.yamlParser).toHaveBeenCalledWith();
  });

  it('should get file on upload and do nothing', () => {
    const mockEvt = { target: { files: [] } };
    spyOn(component, 'jsonParser');
    spyOn(component, 'yamlParser');
    component.onFileSelect(mockEvt);

    expect(mockEvt.target.files.length).toEqual(0);
    expect(component.jsonParser).not.toHaveBeenCalled();
    expect(component.yamlParser).not.toHaveBeenCalled();
  });

  it('selectedFile should contain file', () => {
    component.selectedFile = jsonFile;

    expect(component.selectedFile).not.toBeNull();
  });

  it('should extract file extension from file name and return it as a string', () => {
    component.selectedFile = jsonFile;
    const fileExtTest = component.getFileExtension(jsonFile);

    expect(fileExtTest).toEqual('.json');
  });

  it('should change this.show equal to true for three seconds', () => {
    component.displayErrorMsg();

    expect(component.show).toBeTruthy();
  });

  it('should validate the json file', () => {
    component.selectedFile = jsonFile;
    component.jsonParser();
    spyOn(component, 'swaggerVersionValidator');

    expect(component.swaggerVersionValidator).toHaveBeenCalledTimes(0);
  });

  it('should validate the json file and if fails displays error message and resets file upload', () => {
    component.selectedFile = jsonFile;
    component.jsonParser();
    spyOn(component, 'jsonParser');

    expect(component.jsonParser).toHaveBeenCalledTimes(0);
  });

  it('should validate the yaml file', () => {
    component.selectedFile = yamlFile;
    component.yamlParser();
    spyOn(component, 'swaggerVersionValidator');

    expect(component.swaggerVersionValidator).toHaveBeenCalledTimes(0);
  });

  it('should validate the yaml file and if fails displays error message and resets file upload', () => {
    component.selectedFile = yamlFile;
    component.yamlParser();
    spyOn(component, 'yamlParser');

    expect(component.yamlParser).toHaveBeenCalledTimes(0);
  });

  it('should check for version 2.0 on swagger doc and if valid will do nothing', () => {
    swag.swagger = '2.0';
    component.swaggerVersionValidator(swag);
    spyOn(component, 'displayErrorMsg');

    expect(component.displayErrorMsg).toHaveBeenCalledTimes(0);
  });

  it('should check for version 3.0 on swagger doc and if valid will do nothing', () => {
    swag.swagger = '3.0';
    component.swaggerVersionValidator(swag);
    spyOn(component, 'displayErrorMsg');

    expect(component.displayErrorMsg).toHaveBeenCalledTimes(0);
  });

  it('should check for version on swagger doc and if invalid will set and error message and invoke displayErrorMsg()', () => {
    swag.swagger = '1.0';
    component.swaggerVersionValidator(swag);
    spyOn(component, 'displayErrorMsg');

    expect(component.displayErrorMsg).toHaveBeenCalledTimes(0);
  });

  it('should check for info on swagger doc and if valid will do nothing', () => {
    swag.info = 'true';
    component.swaggerVersionValidator(swag);
    spyOn(component, 'displayErrorMsg');

    expect(component.displayErrorMsg).toHaveBeenCalledTimes(0);
  });

  it('should check for info on swagger doc and display an error message', () => {
    swag.info = undefined;
    component.swaggerVersionValidator(swag);
    spyOn(component, 'displayErrorMsg');

    expect(component.displayErrorMsg).toHaveBeenCalledTimes(0);
  });

  it('should check for info on swagger doc and if invalid will set and error message and invoke displayErrorMsg()', () => {
    swag.info = 'true';
    component.swaggerInfoValidator(swag);
    spyOn(component, 'swaggerInfoValidator');

    expect(component.swaggerInfoValidator).toHaveBeenCalledTimes(0);
  });

  it('should check for host on swagger doc and if valid will do nothing', () => {
    swag.host = 'localhost:8080';
    component.swaggerVersionValidator(swag);
    spyOn(component, 'displayErrorMsg');

    expect(component.displayErrorMsg).toHaveBeenCalledTimes(0);
  });

  it('should check for host on swagger doc and if invalid will set and error message and invoke displayErrorMsg()', () => {
    swag.host = 'https://';
    component.swaggerHostValidator(swag);
    spyOn(component, 'swaggerHostValidator');

    expect(component.swaggerHostValidator).toHaveBeenCalledTimes(0);
  });

  it('should check for host on swagger doc', () => {
    swag.host = 'https://';
    component.swaggerHostValidator(swag);
    spyOn(component, 'swaggerHostValidator');

    expect(component.swaggerHostValidator).toHaveBeenCalledTimes(0);
  });

  it('should check for base path on swagger doc and if valid will do nothing', () => {
    swag.basePath = '/';
    component.swaggerBasePathValidator(swag);
    spyOn(component, 'displayErrorMsg');

    expect(component.displayErrorMsg).toHaveBeenCalledTimes(0);
  });

  it('should check for base path on swagger doc and if invalid will set and error message and invoke displayErrorMsg()', () => {
    swag.basePath = '';
    component.swaggerBasePathValidator(swag);
    spyOn(component, 'swaggerBasePathValidator');

    expect(component.swaggerBasePathValidator).toHaveBeenCalledTimes(0);
  });

  it('should, on change, pass the uploaded file to the appropriate methods for handling', () => {
    spyOn(component, 'onFileSelect');

    expect(component.onFileSelect).toHaveBeenCalledTimes(0);
  });
});
