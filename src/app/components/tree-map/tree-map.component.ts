/* eslint-disable prefer-arrow-callback */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/indent */
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import * as d3 from 'd3';
import { TreeMapService } from 'src/app/services/tree-map.service';
import {
 fromEvent, interval, Observable, Subscription
} from 'rxjs';
import { debounce } from 'rxjs/operators';
import { TreeMapData } from 'src/app/models/tree-map-data';
import { ResultSummary } from 'src/app/models/result-summary';

@Component({
  selector: 'app-tree-map',

  templateUrl: './tree-map.component.html',

  styleUrls: ['./tree-map.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class TreeMapComponent implements OnDestroy, OnInit {
  @ViewChild('chart', { static: true }) protected chartContainer: ElementRef;

  svg: any;

  g: any;

  margin: { top: number; right: number; bottom: number; left: number };

  contentWidth: number;

  contentHeight: number;

  width: number;

  height: number;

  jsonData;

  responseSummaries;

  drawTreeMap;

  treemap;

  root;

  resizeObservable$: Observable<Event>;

  resizeSubscription$: Subscription;

  element;

  dashData: ResultSummary[];

  colorScale;

  colorScaleIsResponseAverage = false;

  constructor(private treeMapService: TreeMapService) {}

  updateDataChange(node) {
    // const node: any = rectangle.data()[0];
    const dataArray: ResultSummary[] = [];
    if (node.children) {
      const nodeChildren: any[] = node.children;
      nodeChildren.forEach((d: any) => {
        const resultSummary: ResultSummary = d.data;
        dataArray.push(resultSummary);
      });
    } else {
      const responseData: ResultSummary = node.data;
      dataArray.push(responseData);
    }
    this.treeMapService.changeCurrentDashdata(dataArray);
  }

  ngOnInit(): void {
    this.element = this.chartContainer.nativeElement;
    this.svg = d3.select(this.element);

    /*
      We need to subscribe to the treeMapData that we define in the TreeMapService,
      The subscription method says that we will only draw the chart if the data being provided
      is not null. This allows us to avoid the D3 library complaining about having no data.
      Also, we could use that as a way to optionally render things if the given data is not
      valid, or takes a long time to become available.
    */
    // eslint-disable-next-line no-return-assign
    this.treeMapService.treeMapData.subscribe((data) => {
      /*
        We need to manipulate the result summaries such that it is an
        object with the same structure defined in TreeMapDataClass.
        The basic structure of that object is a single parent node, with all
        of the endpoint response summaries as the children of that node.
        To the TreeMap, this says that all end points will exist
        inside a single parent box.

        NOTE: we gain no functionality currently by manipulating our data in such a way.
        but it should make it far more scalable when we want to make the TreeMap more complex.
        This function will eventually change to create more complex objects.
      */
      if (data === null) {
        this.jsonData = null;
      } else {
        const treeMapData: TreeMapData = new TreeMapData(
          'Application Endpoints',
          data.resultsummaries,
        );
        this.jsonData = treeMapData;
        const rangeExtent = d3.extent(this.jsonData.children, (d: any) => +d.responseAvg);

        const responseAvgScale = d3
          .scaleLinear<string>()
          .domain([rangeExtent[0], rangeExtent[1]])
          .range(['#FD23C0', '#26F488']);

        const successFailPercentage = d3
          .scaleLinear<string>()
          .domain([0, 0.25, 0.5, 0.75, 1.0])
          .range(['#FD23C0', '#FF81DC', '#F8F8F8', '#80FFBC', '#0ce977']);

        this.colorScale = this.colorScaleIsResponseAverage
          ? responseAvgScale
          : successFailPercentage;
        this.initChart();
        this.createChart();
      }
    });

    // eslint-disable-next-line no-return-assign
    this.treeMapService.currentDashData.subscribe((data) => (this.dashData = data));

    /*
    It is yet to be seen how this chart will do with resizing when given a heavy
    amount of data. In the case that the redrawing begins to become too heavy of
    an operation, I suggest that the graph only be resized every X amount of seconds
    before being resized again. The inclusion of the following lines would accomplish this.
    */
    const resizeObservableNoDebounce$ = fromEvent(window, 'resize');
    this.resizeObservable$ = resizeObservableNoDebounce$.pipe(debounce(() => interval(100)));
    // this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      this.svg.selectAll('*').remove();
      this.initChart();
      this.createChart();
    });
  }

  initChart() {
    this.margin = {
      top: +this.svg.style('margin-top').replace('px', ''),
      right: +this.svg.style('margin-right').replace('px', ''),
      bottom: +this.svg.style('margin-bottom').replace('px', ''),
      left: +this.svg.style('margin-left').replace('px', ''),
    };

    this.width = +this.svg.style('width').replace('px', '');
    this.height = +this.svg.style('height').replace('px', '');

    this.contentWidth = this.width - this.margin.left - this.margin.right;
    this.contentHeight = this.height - this.margin.top - this.margin.bottom;

    // eslint-disable-next-line prefer-template
    this.g = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  async createChart() {
    /*
      It used to be that the height was calculated via window.innerHeight minus the
      total amount of space being occupied by other objects. Should any new objects
      be added above or below the treeMap, this would be accounted for. Similarly,
      this resize treats the other elements sizes as static, were that to change and other
      elements heights became variable, this implementation would most likely not work.

      Now we are resizing via SCSS.
    */
    // const height = window.innerHeight - 74;
    // this.svg.attr('height', '170px').attr('width', '100%');
    const outerPadding = 16;
    const innerPadding = 4;

    /*
      Because the width of the SVG element is set to 100%, it will auotmatically
      update on window resize. We then can enter the group elements of the svg and
      access the width of the parent container and match it.
    */
    // eslint-disable-next-line no-underscore-dangle
    // const width = this.svg._groups[0][0].clientWidth;
    this.root = d3.hierarchy(this.jsonData);
    // We define the successFailPercentage as the value that we are basing the treeMap sizes on.
    // If a node does not have that property, then that nodes value will be 0
    this.root.sum((d) => (Object.prototype.hasOwnProperty.call(d, 'responseAvg') ? d.responseAvg : 0),);

    this.treemap = d3
      .treemap()
      .size([this.width, this.height])
      .paddingBottom(outerPadding)
      .paddingLeft(outerPadding)
      .paddingRight(outerPadding)
      .paddingTop(outerPadding * 4)
      .paddingInner(innerPadding);

    this.treemap(this.root);

    const rects = this.g
      .selectAll('rect')
      .data(this.root.descendants())
      .enter()
      .append('rect')
      .style('fill', (d) => {
        if (this.colorScaleIsResponseAverage && (d.data.responseAvg || d.data.responseAvg === 0)) {
          return this.colorScale(d.data.responseAvg);
        }
        if (!this.colorScaleIsResponseAverage
                && (d.data.successFailPercentage || d.data.successFailPercentage === 0)) {
          return this.colorScale(d.data.successFailPercentage * 0.01);
        }
        return 'white';
      })
      .style('opacity', 1)
      .style('stroke', 'white')
      .attr('x', (d) => d.x0)
      .attr('y', (d) => d.y0)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('rx', '4')
      .attr('class', 'interactable')
      .on('click', (_, i) => {
        this.updateDataChange(i);
      });
    /*
      Here is a fantastic example of how the selector ACTUALLY is used.
      There does not exist any titles elements, so we create them by calling
      the select all statements and then appending text.

      Note: All we do is append text items eventually. So, this is also a really good
      example of how to filter out items by data and then using the given coordinates
      to map to spots.
    */
    const labels = this.g
      .selectAll('titles')
      .data(this.root.descendants())
      .enter()
      .append('text')
      .style('font-size', '1rem')
      .style('fill', (d) => (d.data.name ? 'black' : 'white'))
      .attr('x', (d) => d.x0 + outerPadding)
      .attr('y', (d) => d.y0 + outerPadding + 25)
      // .append('tspan')
      .text(function calc(d) {
        if (d.data.uri) {
          console.log(d.data.uri.split('.').slice(-1)[0]);
          console.log(d.data.uri.split('.').slice(-1)[0].match('/[A-Za-z/0-9+]+'));
}
        /*
          Google.com/random/random2

          splits on dot: com/random/random2

          match regex: /random/random2
         */
        return d.data.name ? d.data.name : d.data.uri.split('.').slice(-1)[0].match('/[A-Za-z/0-9]+');
      })
      .style('font-size', function calcFontSize(d) {
        console.log(this.getComputedTextLength());
        if (Math.min(d.x1 - d.x0, this.getComputedTextLength()) !== this.getComputedTextLength()) {
          return '8pt';
      }
      return null;
      });
    // labels
    //   .selectAll('tspan')
    //   .data((d) => {
    //     if (d.data.name) {
    //       return d.data.name;
    //     }
    //     return d.data.uri;
    //   })
    //   .join('tspan')
    //     .attr('fill-opacity', (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
    //     .text((d) => d);

    this.g
      .selectAll('methods')
      .data(this.root.leaves())
      .enter()
      .append('text')
      .style('font-size', '1rem')
      .style('fill', 'white')
      .attr('x', (d) => d.x0 + outerPadding)
      .attr('y', (d) => d.y0 + outerPadding + 5)
      .text((d) => d.data.httpMethod)
      .attr('class', 'method-label');
  }
}
