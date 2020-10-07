import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpTableData } from '../../models/http-table-data';
import { Re } from '../../models/response';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss']
})
export class DemoTableComponent implements OnInit {
  constructor(private http: HttpClient) { }

  public res : Re;

  public resultSummaries : HttpTableData [] = undefined;

  async ngOnInit(): Promise<void> {
    const re = await this.http.get<Re>('http://localhost:8083/Docutest/swaggersummary/3', {

    }).toPromise();

    this.res = re;
    this.resultSummaries = re.resultsummaries;
  }
}
