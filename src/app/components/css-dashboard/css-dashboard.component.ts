/* eslint-disable @angular-eslint/no-host-metadata-property */
// For our purposes, using the host metadata property is totally fine.
// we would be more inclined to use annotations if we wanted to have logic
// tied to the the property.

import {
  Component, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { TreeMapService } from 'src/app/services/tree-map.service';

@Component({
  selector: 'app-css-dashboard',
  templateUrl: './css-dashboard.component.html',
  styleUrls: ['./css-dashboard.component.scss'],
  host: { class: 'host-container' }
})
export class CssDashboardComponent implements OnInit {
  constructor(private treeMapService: TreeMapService, private router: Router) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('swaggerSummaryId')) {
      this.treeMapService.updateData(Number(sessionStorage.getItem('swaggerSummaryId')));
    } else {
      this.router.navigateByUrl('/upload');
    }
  }
}
