/* eslint-disable no-undef */
import {
  Component, OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwaggerSummary } from '../../models/swagger-summary/swagger-summary';
import { ResultSummary } from '../../models/result-summary/result-summary';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss']
})
export class DemoTableComponent implements OnInit {
  constructor(private http: HttpClient) { }

  public swaggerSummary : SwaggerSummary;

  public swaggerSummaryId : number;

  public resultSummary : ResultSummary[];

  async ngOnInit(): Promise<SwaggerSummary> {
    this.swaggerSummaryId = Number(sessionStorage.getItem('swaggerSummaryId'));
    const re = await this.http.get<SwaggerSummary>(`http://localhost:8083/Docutest/swaggersummary/${this.swaggerSummaryId}`, {

    }).toPromise();

    this.swaggerSummary = re;
    this.resultSummary = re.resultsummaries;
    sessionStorage.removeItem('swaggerSummaryId');
    return this.swaggerSummary;
  }
}
