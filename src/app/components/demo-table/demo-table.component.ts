/* eslint-disable no-undef */
import { Component, OnInit } from '@angular/core';
import { SwaggerService } from 'src/app/services/swagger.service';
import { SwaggerSummary } from '../../models/swagger-summary/swagger-summary';
import { ResultSummary } from '../../models/result-summary/result-summary';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss']
})
export class DemoTableComponent implements OnInit {
  constructor(private swaggerService: SwaggerService) { }

  public swaggerSummary : SwaggerSummary;

  public swaggerSummaryId : number;

  public resultSummary : ResultSummary[];

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.swaggerSummaryId = Number(sessionStorage.getItem('swaggerSummaryId'));
    const re = await this.swaggerService.loadSummaryInTable(this.swaggerSummaryId);
    this.swaggerSummary = re;
    this.resultSummary = re.resultsummaries;
  }
}
