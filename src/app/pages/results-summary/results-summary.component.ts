import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-summary',
  templateUrl: './results-summary.component.html',
  styleUrls: ['./results-summary.component.scss']
})
export class ResultsSummaryComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // eslint-disable-next-line no-undef
    if (sessionStorage.getItem('swaggerSummaryId') == null) {
      this.router.navigateByUrl('/upload');
    }
  }
}
