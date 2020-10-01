/* eslint-disable radix */
/* eslint-disable no-undef */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.scss']
})
export class LeftColumnComponent implements OnInit {
  public btnDispArr: Array<any>;

  public paths: Array<any>;

  constructor() {
    this.btnDispArr = [];
  }

  ngOnInit(): void {
    this.paths = JSON.parse(localStorage.getItem('swagPaths'));
  }
}
