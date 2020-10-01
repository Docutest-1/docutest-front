import { Component, OnInit } from '@angular/core';
import { data } from '../../sampleData';
import { HttpTableData } from '../../models/http-table-data';

@Component({
  selector: 'app-http-table',
  templateUrl: './http-table.component.html',
  styleUrls: ['./http-table.component.scss'],
})
export class HttpTableComponent implements OnInit {
  data: HttpTableData;
  successes: number;

  constructor() {
    Object.assign(this, { data });
    this.successes =
      this.data.failCount / (this.data.successFailPercentage / 100) -
      this.data.failCount;
  }

  ngOnInit(): void {}
}
