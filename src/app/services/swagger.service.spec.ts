import { TestBed } from '@angular/core/testing';
import { SwaggerUploadResponse } from 'src/app/models/swagger-upload-response/swagger-upload-response';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { SwaggerService } from './swagger.service';

describe('SwaggerService', () => {
  let service: SwaggerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwaggerService],
      imports: [
        HttpClientTestingModule
      ],
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('SwaggerService methods', () => {
  let service: SwaggerService;
  let httpClientSpy: { get: jasmine.Spy };
  const fakeData = new Blob(['']);
  const fakeDataArr = new Array<Blob>();
  fakeDataArr.push(fakeData);
  const yamlFile = new File(fakeDataArr, 'fakeFile.yaml', { type: 'text/yaml' });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwaggerService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SwaggerService(httpClientSpy as any);
  });

  it('UploadSwaggerFile() has valid swagger file should return', () => {
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    const summaryValue = '{eta: , resultRef:, swaggerSummaryId:}';
    formData.append('file', yamlFile);
    formData.append('LoadTestConfig', '{ "testPlanName" : "ThreeEndpointTest", "loops" : -1, "duration" : 10, "threads" : 10, "rampUp" : 2,  "followRedirects" : true }');

    service.uploadSwaggerFile(formData);

    // httpClientSpy.get.and.returnValue(of(summaryValue));

    // service.uploadSwaggerFile(formData).subscribe(
    // SwaggerUpload =>
    // );
    // expect(Response).toEqual(summaryValue);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('retrieveSwaggerSummary() returns a valid SwaggerSummary', () => {
    const swaggerResponse = new SwaggerUploadResponse(1, 'Response', 1);
    const response = service.retrieveSwaggerSummary(swaggerResponse);
    // expect(response).toEqual(true);
  });

  it('loadSummaryInTable sends data to load table', () => {

  });
});
