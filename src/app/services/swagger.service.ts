/* eslint-disable no-console */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SwaggerSummary } from '../models/swagger-summary/swagger-summary';
import { SwaggerUploadResponse } from '../models/swagger-upload-response/swagger-upload-response';

@Injectable({
  providedIn: 'root'
})
export class SwaggerService {
  public uploadForm: FormGroup;

  public secondsUntilETA: number;

  public swaggerSummary: SwaggerSummary;

  public swaggerUploadResponse: SwaggerUploadResponse;

  private uri = `${environment.API_BASE_URL}:${environment.PORT}`;

  constructor(private http: HttpClient) { }

  async uploadSwaggerFile(formData: FormData): Promise<SwaggerUploadResponse> {
    const swaggerResponse = await this.http.post<SwaggerUploadResponse>(`${this.uri}/Docutest/upload`, formData).toPromise();
    return swaggerResponse;
  }

  async retrieveSwaggerSummary(swaggerResponse: SwaggerUploadResponse): Promise<SwaggerSummary> {
    let receivedSummary = false;
    while (!receivedSummary) {
      /* eslint-disable no-await-in-loop */
      this.swaggerSummary = await this.http.get<SwaggerSummary>(`${this.uri}/${swaggerResponse.resultRef}`).toPromise();
      if (this.swaggerSummary.resultsummaries.length) {
        receivedSummary = true;
      }
    }
    return this.swaggerSummary;
  }

  async loadSummaryInTable(swaggerSummaryId: number): Promise<SwaggerSummary> {
    const re = await this.http.get<SwaggerSummary>(`${this.uri}/Docutest/swaggersummary/${swaggerSummaryId}`).toPromise();
    return re;
  }
}
