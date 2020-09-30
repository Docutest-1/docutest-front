import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import {multi} from '../../data';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  multi;
  routeNames: any[];
  view: any[] = [1000, 500];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Request';
  yAxisLabel: string = 'Time (Miliseconds)';
  timeline: boolean = true;
  selectedRoute;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    this.routeNames = new Array();
    Object.assign(this, {multi});

    for(const [key, value] of Object.entries(this.multi)){
      this.routeNames.push(key);
    }

    this.selectedRoute = this.multi[0];
  }

  ngOnInit(): void {

  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  showRoute(routeName) {
    this.selectedRoute = this.multi[routeName];
  }

}
