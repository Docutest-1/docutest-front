/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
// NgRX
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GraphRoute } from '../../state/graph-route/graph-route.model';
// import { UPDATE_ROUTE } from '../../state/graph-route/graph-route.actions';
import { multi } from '../../data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  graphRoute$: Observable<GraphRoute>;

  multi;

  routeNames: any[];

  view: any[] = [1000, 500];

  // options
  legend = true;

  showLabels = true;

  animations = true;

  xAxis = true;

  yAxis = true;

  showYAxisLabel = true;

  showXAxisLabel = true;

  xAxisLabel = 'Request';

  yAxisLabel = 'Time (Miliseconds)';

  timeline = true;

  selectedRoute;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private store: Store<{lineChartData}>) {
    this.routeNames = [];
    Object.assign(this, { multi });

    // eslint-disable-next-line no-restricted-syntax
    for (const [key] of Object.entries(this.multi)) {
      this.routeNames.push(key);
    }
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  showRoute(routeName): void {
    this.selectedRoute = this.multi[routeName];
  }
}
