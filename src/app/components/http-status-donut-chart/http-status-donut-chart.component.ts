import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
// import { GenericD3Component } from '../generic-d3/generic-d3.component';

@Component({
  selector: 'app-http-status-donut-chart',
  templateUrl: './http-status-donut-chart.component.html',
  styleUrls: ['./http-status-donut-chart.component.scss'],
})
export class HttpStatusDonutChartComponent implements OnInit {
  height = 200;

  width = 200;

  margin = 10;

  private radius: number = Math.min(this.height, this.width) / 2 - this.margin;

  private dummy_data: any;

  private arc: any;

  private pie: any;

  private slices: any;

  private color: any;

  private mainContainer: any;

  private svg: any;

  // ngOnInit(): void {
  //   this.dummy_data = [{ name: 'A', value: -4, abs: 4 }, { name: 'B', value: -8, abs: 8 },
  // { name: 'C', value: -6, abs: 6 }];
  //   this.initChart();
  //   this.createChart();
  // }

  // createChart() {
  //   this.radius = Math.min(this.width, this.height) / 2;
  //   this.color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56']);
  //   this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
  //   this.mainContainer = this.svg.select('g').attr('transform',
  // `translate(${this.radius},${this.radius})`);
  // }
  private createSvg(): void {
    this.svg = d3
      .select('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);
  }

  createColors() {
    this.color = d3.scaleOrdinal()
      .domain(this.dummy_data.map((d) => d.abs.toString()))
      .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
  }

  ngOnInit() {
    this.dummy_data = [
      { name: 'A', value: -4, abs: 4 },
      { name: 'B', value: -16, abs: 16 },
    ];
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private drawChart(): void {
    this.pie = d3.pie<any>().value((d: any) => Number(d.abs));
    this.svg
      .selectAll('pieces')
      .data(this.pie(this.dummy_data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(80).outerRadius(this.radius))
      .attr('fill', (d, i) => (this.color(i)))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');
  }
}
