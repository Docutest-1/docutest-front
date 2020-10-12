/* eslint-disable no-console */
/* eslint-disable no-undef */
import {
  Component, OnInit, ViewChild, ElementRef, EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import yaml from 'js-yaml';
import { Router } from '@angular/router';
import { SwaggerService } from 'src/app/services/swagger.service';
import { Swag } from '../../models/swag';
import { SwaggerUploadResponse } from '../../models/swagger-upload-response/swagger-upload-response';
import { SwaggerSummary } from '../../models/swagger-summary/swagger-summary';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  public uploadForm: FormGroup;

  public selectedFile: File;

  public errorMsg: String = '';

  public show = false;

  public fileExt: string;

  public regex = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;

  public loadTestConfig: string;

  public formData: FormData = new FormData();

  public sessionStorage: Storage;

  public secondsUntilETA: number;

  public swaggerSummary: SwaggerSummary;

  public swaggerUploadResponse: SwaggerUploadResponse;

  /** Used to reset the file input */
  @ViewChild('fileIn')
  fileInput: ElementRef;

  public swag: Swag;

  public window: Window;

  public eventEmitter: EventEmitter<Event>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private swaggerService: SwaggerService,
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      swaggerFile: [''],
    });

    sessionStorage.clear();
  }

  getFileExtension(file: File): string {
    return file.name.match(this.regex)[0];
  }

  jsonParser(): void {
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      try {
        this.swag = JSON.parse(fileReader.result as string);
        this.swaggerVersionValidator(this.swag);
        this.swaggerInfoValidator(this.swag);
        this.swaggerHostValidator(this.swag);
        this.swaggerBasePathValidator(this.swag);
      } catch (e) {
        this.errorMsg = 'Error: Failed while trying to parse.';
        this.displayErrorMsg();
        console.log(e);
      }
    };
  }

  yamlParser(): void {
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      try {
        this.swag = yaml.safeLoad(fileReader.result as string);
        this.swaggerVersionValidator(this.swag);
        this.swaggerInfoValidator(this.swag);
        this.swaggerHostValidator(this.swag);
        this.swaggerBasePathValidator(this.swag);
      } catch (e) {
        this.errorMsg = 'Error: Failed while trying to parse.';
        this.displayErrorMsg();
        console.log(e);
      }
    };
  }

  /**
    After selecting the file.
    Validates the swagger file: https://swagger.io/specification/v2/
  */
  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fileExt = this.getFileExtension(this.selectedFile);
      if (this.fileExt === '.json') {
        this.jsonParser();
      } else if (this.fileExt === '.yaml' || this.fileExt === '.yml') {
        this.yamlParser();
      }
    }
  }

  displayErrorMsg(): void {
    this.show = true;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    setTimeout(() => { this.show = false; }, 3000);
  }

  /** Validates swagger version: Specifies the Swagger Specification version being used. */
  swaggerVersionValidator(swag: Swag): void {
    if (swag.swagger !== '2.0' && swag.swagger !== '3.0') {
      this.errorMsg = 'Error: You have the wrong swagger version.';
      this.displayErrorMsg();
    }
  }

  /**
    Validates info: Provides metadata about the API.
    The metadata can be used by the clients if needed.
  */
  swaggerInfoValidator(swag: Swag): void {
    if (swag.info === null || swag.info === undefined) {
      this.errorMsg = 'Error: There are no provided info.';
      this.displayErrorMsg();
    }
  }

  /**
    Validates host: It MUST be the host only and does not include the scheme nor sub-paths.
    It MAY include a port.
  */
  swaggerHostValidator(swag: Swag): void {
    const scheme = 'https://';
    const regex = RegExp('^(.+)/([^/]+)$');
    if (swag.host) {
      if (swag.host.includes(scheme) || swag.host.slice(-1) === '/' || regex.test(swag.host)) {
        this.errorMsg = 'Error: Invalid host.';
        this.displayErrorMsg();
      }
    }
  }

  /**
    Validates base path: The value MUST start with a leading slash /.
  */
  swaggerBasePathValidator(swag: Swag): void {
    if (swag.basePath) {
      if (!(swag.basePath.includes('/'))) {
        this.errorMsg = 'Error: Invalid base path.';
        this.displayErrorMsg();
      }
    }
  }

  async onSubmit(): Promise<void> {
    this.loadTestConfig = sessionStorage.getItem('loadTestConfig');
    this.formData.append('file', this.uploadForm.get('swaggerFile').value);
    this.formData.append('LoadTestConfig', this.loadTestConfig);
    console.log('Posting Swagger File');
    const swaggerResponse = await this.swaggerService.uploadSwaggerFile(this.formData);
    console.log('Received Swagger Response:', swaggerResponse);
    this.secondsUntilETA = swaggerResponse.eta - new Date().getTime();
    console.log('Estimated ETA:', this.secondsUntilETA * 1000);
    await this.timeout();
    console.log('Timeout Complete');
    sessionStorage.setItem('swaggerSummaryId', String(swaggerResponse.swaggerSummaryId));
    await this.swaggerService.retrieveSwaggerSummary(swaggerResponse);
    this.router.navigateByUrl('/results-summary');
  }

  async timeout(): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, this.secondsUntilETA));
  }
}
