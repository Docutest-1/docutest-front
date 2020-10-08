/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';

import * as d3 from 'd3';
@Component({
  selector: 'app-http-status-circle-chart',
  templateUrl: './http-status-circle-chart.component.html',
  styleUrls: ['./http-status-circle-chart.component.scss']
})
export class HttpStatusCircleChartComponent implements OnInit {
  /*
    Potential inputs from parent
  */
  @Input() pieChartData;

  @Input() pieChartName;

  private chartName = '200 Status Code';

  /*
    Class defined
  */
  private colorRange = ['#39DB80', '#C0EBCB', '#9debbf'];

  private colors = d3.scaleOrdinal().range(this.colorRange);

  private height = 200;

  private width = 200;

  private margin = 10;

  private radius = Math.min(this.height, this.width) / 2 - this.margin;

  private dummy_data;

  private og_data;

  private selectedPath = [];

  private svg;

  private g;

  private path;

  private second_arc = d3.arc().outerRadius(this.radius - 40).innerRadius(this.radius - 80);

  private realPercentage;

  /*
  The pie variable is set to the d3 pie construct. This takes our data and
  manipulates it in away such that it will become readable for the eventual
  chart draw method.
  The function value() is necessary to provide the pie generator
  with the specific numeric value of your data.
  */
  private pie = d3.pie()
    .value((d: any) => Number(d.value))
    .sort(null);

  // constructor() {
  // this.dummy_data = [
  //   {
  //     colorIndex: 0, value: 50, label: '200', childData: 1
  //   },
  //   {
  //     colorIndex: 1, value: 25, label: '200', childData: null
  //   },
  // ];
  // this.realPercentage = this.dummy_data[0].value;
  // this.og_data = this.dummy_data.slice();

  // }

  ngOnInit(): void {
    this.createSvg();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3
      .select('svg')
      .attr('width', this.width)
      .attr('height', this.height);
    this.g = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);
  }

  private drawChart(): void {
    /*
      Defines the arc size for entire chart.
      This arc is then used when creating the multiple 'path' classes
      which is the pie chart
    */
    const arc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(this.radius - 10);

    this.path = this.g
      .selectAll('path')
      .data(this.pie(this.dummy_data))
      .join(
        (enter) => enter
          .append('path')
          .style('fill', (d) => this.colors(d.data.colorIndex))
          .attr('d', arc)
          .each(function storeCurr(d) { this._current = d; })
      );

    /*
        Filters to only allow paths with extra data
        to be interacted with
    */
    const dataPath = this.path
      .filter((d, i) => d.data.childData !== null);

    dataPath.style('cursor', 'pointer');

    this.g
      .append('text')
      .attr('text-anchor', 'middle')
      .style('font-size', '50pt')
      .text(this.realPercentage);

    const arcOver = d3.arc()
      .outerRadius(this.radius * 1.05)
      .innerRadius(this.radius - 10);

    dataPath.on('mouseover', function expandSlice() {
      d3.select(this)
        .transition()
        .ease(d3.easeSin)
        .duration(100)
        .attr('d', arcOver);
    }).on('mouseout', function returnExpandedSlice() {
      d3.select(this)
        .transition()
        .ease(d3.easeBounce)
        .duration(500)
        .attr('d', arc);
    });
  }
}
