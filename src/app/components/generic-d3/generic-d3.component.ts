import {
  Component, ViewChild, ElementRef
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-generic-d3',
  templateUrl: './generic-d3.component.html',
  styleUrls: ['./generic-d3.component.scss']
})
export class GenericD3Component {
  @ViewChild('chart', { static: true }) protected chartContainer: ElementRef;

  svg: any;

  g: any;

  margin: { top: number; right: number; bottom: number; left: number; };

  contentWidth: number;

  contentHeight: number;

  width: number;

  height: number;

  initChart(): void {
    const element = this.chartContainer.nativeElement;

    this.svg = d3.select(element);

    this.margin = {
      top: +this.svg.style('margin-top').replace('px', ''),
      right: +this.svg.style('margin-right').replace('px', ''),
      bottom: +this.svg.style('margin-bottom').replace('px', ''),
      left: +this.svg.style('margin-left').replace('px', '')
    };

    this.width = +this.svg.style('width').replace('px', '');
    this.height = +this.svg.style('height').replace('px', '');

    this.contentWidth = this.width - this.margin.left - this.margin.right;
    this.contentHeight = this.height - this.margin.top - this.margin.bottom;

    // eslint-disable-next-line prefer-template
    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
}
