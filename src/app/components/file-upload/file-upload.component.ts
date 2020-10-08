/* eslint-disable no-console */
/* eslint-disable no-undef */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// ngRx
import { Store } from '@ngrx/store';
import { DashboardState } from '../../state/dashboard-data/dashboard-data.model';
import { ADD_RESULT_SUMMARIES, RESET_RESULT_SUMMARIES } from '../../state/dashboard-data/dashboard-data.actions';
import { SwaggerUploadResponse } from '../../models/swagger-upload-response';
import { SwaggerSummary } from '../../models/swagger-summary';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  private baseUrl = 'http://localhost:8083/';

  public uploadForm: FormGroup;

  public swaggerSummary: SwaggerSummary;

  public secondsUntilETA: number;

  public currentDashboardData: DashboardState;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private store: Store<{ dashboardData }>) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      swaggerFile: [''],
    });

    this.store.select('dashboardData').subscribe((dashData) => { this.currentDashboardData = dashData; });
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('swaggerFile').setValue(file);
    }
  }

  async onSubmit(): Promise<void> {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('swaggerFile').value);
    formData.append('LoadTestConfig', '{ "testPlanName" : "ThreeEndpointTest", "loops" : -1, "duration" : 10, "threads" : 10, "rampUp" : 2, "followRedirects" : true }');
    // this.http.post<SwaggerUploadResponse>(`${this.baseUrl}/upload`, formData).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err),
    // );
    console.log('Posting Swagger File');
    const swaggerResponse = await this.http.post<SwaggerUploadResponse>(`${this.baseUrl}Docutest/upload`, formData).toPromise();
    console.log('Received Swagger Response:', swaggerResponse);
    this.secondsUntilETA = (swaggerResponse.eta - new Date().getTime());
    console.log('Estimated ETA:', this.secondsUntilETA * 1000);
    await this.timeout();
    console.log('Timeout Complete');
    this.retrieveSwaggerSummary(swaggerResponse);
  }

  timeout(): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, this.secondsUntilETA));
  }

  async retrieveSwaggerSummary(swaggerResponse: SwaggerUploadResponse) {
    console.log('Entered Swagger Summary Retriever');
    let receivedSummary = false;
    while (!receivedSummary) {
      /* eslint-disable no-await-in-loop */
      this.swaggerSummary = await this.http.get<SwaggerSummary>(`${this.baseUrl}${swaggerResponse.resultRef}`).toPromise();

      /* eslint-enable no-await-in-loop */

      if (this.swaggerSummary.resultsummaries.length) {
        console.log(this.swaggerSummary);
        // for (let i = 0; i <= this.swaggerSummary.resultsummaries.length; i += 1) {
        if (this.currentDashboardData.resultSummaries.length) {
          this.store.dispatch(RESET_RESULT_SUMMARIES());
        }
        this.store.dispatch(ADD_RESULT_SUMMARIES(
          { resultSummaryArray: this.swaggerSummary.resultsummaries }
        ));
        receivedSummary = true;
      }
    }
  }
}
