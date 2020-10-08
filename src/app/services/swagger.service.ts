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

  constructor(private http: HttpClient) { }

  async uploadSwaggerFile(formData: FormData): Promise <SwaggerUploadResponse> {
    const swaggerResponse = await this.http.post<SwaggerUploadResponse>(`${environment.API_BASE_URL}:${environment.PORT}/Docutest/upload`, formData).toPromise();
    return swaggerResponse;
  }

  async retrieveSwaggerSummary(swaggerResponse: SwaggerUploadResponse): Promise <SwaggerSummary> {
    console.log('Entered Swagger Summary Retriever');
    let receivedSummary = false;
    while (!receivedSummary) {
      /* eslint-disable no-await-in-loop */

      this.swaggerSummary = await this.http.get<SwaggerSummary>(`${environment.API_BASE_URL}:${environment.PORT}/${swaggerResponse.resultRef}`).toPromise();
      /* eslint-enable no-await-in-loop */
      if (this.swaggerSummary.resultsummaries.length) {
        console.log(this.swaggerSummary);
        receivedSummary = true;
      }
      console.log('Swagger Summary Results Summary Length:', this.swaggerSummary.resultsummaries.length);
    }
    return this.swaggerSummary;
  }

  async loadSummaryInTable(swaggerSummaryId: number): Promise <SwaggerSummary> {
    const re = await this.http.get<SwaggerSummary>(`http://localhost:8083/Docutest/swaggersummary/${swaggerSummaryId}`, {

    }).toPromise();
    return re;
  }
}
