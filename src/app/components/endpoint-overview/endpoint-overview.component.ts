import { Component, OnInit } from '@angular/core';
import { TreeMapService } from 'src/app/services/tree-map.service';

@Component({
  selector: 'app-endpoint-overview',
  templateUrl: './endpoint-overview.component.html',
  styleUrls: ['./endpoint-overview.component.scss']
})
export class EndpointOverviewComponent implements OnInit {
  endpointStats: any[];

  constructor(private treeMapService: TreeMapService) {
  }

  ngOnInit(): void {
    this.treeMapService.currentDashData.subscribe((data) => {
      this.endpointStats = [];
      if (data) {
        const currData = data[0];
        const responseAvg = { name: 'Response \nAverage', value: `${currData.responseAvg} ms` };
        const successFailPercentage = { name: 'Success \nPercentage', value: `${currData.successFailPercentage} %` };
        const failCount = { name: 'Total \nFailures', value: `${currData.failCount}` };
        const responseMax = { name: 'Requests \nper Second', value: `${currData.reqPerSec.toPrecision(2)}` };

        this.endpointStats.push(responseAvg);
        this.endpointStats.push(successFailPercentage);
        this.endpointStats.push(failCount);
        this.endpointStats.push(responseMax);
      }
    });
  }
}
