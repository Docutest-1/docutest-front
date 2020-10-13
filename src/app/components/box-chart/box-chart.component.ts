import {
  AfterViewInit,
  Component, ElementRef, ViewChild, ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import { BoxChartData } from 'src/app/models/box-chart-data';
import { ResultSummary } from 'src/app/models/result-summary';
import { TreeMapService } from 'src/app/services/tree-map.service';

@Component({
  selector: 'app-box-chart',
  templateUrl: './box-chart.component.html',
  styleUrls: ['./box-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoxChartComponent implements AfterViewInit {
  @ViewChild('boxChart') chartContainer: ElementRef;

  boxChartData: BoxChartData;

  element;

  svg;

  g;

  height;

  width;

  margin;

  contentHeight;

  contentWidth;

  boxCenter;

  boxHeight;

  resultSummaryData$: ResultSummary;

  padding;

  constructor(private treeMapService: TreeMapService) {

  }

  ngAfterViewInit(): void {
    this.element = this.chartContainer.nativeElement;
    this.svg = d3.select(this.element);
    this.treeMapService.currentDashData.subscribe((data) => {
      if (data) {
        /*
          Totally unnecessary to follow this rule,
          this will most likely be changed anyways.
        */
        // eslint-disable-next-line prefer-destructuring
        this.resultSummaryData$ = data[0];

        const interQuartileRange = (this.resultSummaryData$.response75Percentile
                                      - this.resultSummaryData$.response25Percentile);
        const lowerFenceOne = this.resultSummaryData$.response25Percentile
                                  - (1.5 * interQuartileRange);

        const lowerFenceTwo = this.resultSummaryData$.response25Percentile
                                  - (3.0 * interQuartileRange);

        const upperFenceOne = this.resultSummaryData$.response75Percentile
                                  + (1.5 * interQuartileRange);

        const upperFenceTwo = this.resultSummaryData$.response75Percentile
                                  + (3.0 * interQuartileRange);

        this.boxChartData = new BoxChartData(
          0,
          this.resultSummaryData$.response25Percentile,
          this.resultSummaryData$.response50Percentile,
          this.resultSummaryData$.response75Percentile,
          interQuartileRange,
          this.resultSummaryData$.responseMax,
          lowerFenceOne,
          lowerFenceTwo,
          upperFenceOne,
          upperFenceTwo,
        );
        this.initChart();
        this.createChart();
      } else {
        this.boxChartData = new BoxChartData();
      }
    });
  }

  initChart() {
    this.svg.selectAll('*').remove();
    this.margin = {
      top: +this.svg.style('margin-top').replace('px', ''),
      right: +this.svg.style('margin-right').replace('px', ''),
      bottom: +this.svg.style('margin-bottom').replace('px', ''),
      left: +this.svg.style('margin-left').replace('px', '')
    };

    this.width = +this.svg.style('width').replace('px', '');
    this.height = +this.svg.style('height').replace('px', '');
    this.padding = {
      top: +this.svg.style('padding-top').replace('px', ''),
      bottom: +this.svg.style('padding-bottom').replace('px', ''),
      left: +this.svg.style('padding-left').replace('px', ''),
      right: +this.svg.style('padding-right').replace('px', ''),
    };
    this.contentWidth = this.width - this.margin.left - this.margin.right;
    this.contentHeight = this.height - this.margin.top - this.margin.bottom;

    this.boxCenter = this.height / 2;
    this.boxHeight = 100;
    // eslint-disable-next-line prefer-template
    this.g = this.svg.append('g').attr('transform', 'translate( 20, 20)');
  }

  createChart() {
    const xScale = d3.scaleLinear()
      .domain([this.boxChartData.min, this.boxChartData.upperFenceOne])
      .nice(5)
      .range([0, 325]);
      // .nice();

    const xAxisGenerator = d3.axisBottom(xScale).tickArguments([5]).tickSize(16);

    this.g.append('g').call(xAxisGenerator).style('transform', `translate(0, ${this.boxCenter + this.boxHeight}px)`).style('font-size', '14px');

    this.g.append('line')
      .attr('y1', this.boxCenter)
      .attr('y2', this.boxCenter)
      .attr('x1', xScale(this.boxChartData.min))
      .attr('x2', xScale(this.boxChartData.upperFenceOne))
      .attr('stroke', 'black');

    this.g.append('rect')
      .attr('y', this.boxCenter - this.boxHeight / 2)
      .attr('x', xScale(this.boxChartData.firstQuartile))
      .attr('width', (xScale(this.boxChartData.thirdQuartile) - xScale(this.boxChartData.firstQuartile)))
      .attr('height', this.boxHeight)
      .attr('stroke', 'black')
      .style('fill', ' #80FFBC')
      .style('opacity', '1');
    this.g
      .selectAll('toto')
      .data([
        this.boxChartData.min,
        this.boxChartData.median,
        this.boxChartData.upperFenceOne
      ])
      .enter()
      .append('line')
      .attr('y1', this.boxCenter - this.boxHeight / 2)
      .attr('y2', this.boxCenter + this.boxHeight / 2)
      .attr('x1', (d) => (xScale(d)))
      .attr('x2', (d) => (xScale(d)))
      .attr('stroke', 'black');

    this.g
      .append('text')
      .style('transform', `translate(${((this.width) / 1.8)}px, ${this.boxCenter + this.boxHeight}px)`)
      .style('text-anchor', 'middle')
      .text('Response Time (ms)');
  }
}
