export class BoxChartData {
  min: number;

  firstQuartile: number;

  median: number;

  thirdQuartile: number;

  interQuartileRange: number;

  max: number;

  lowerFenceOne: number;

  lowerFenceTwo: number;

  upperFenceOne: number;

  upperFenceTwo: number;

  constructor();
  constructor(
    min: number,

    firstQuartile: number,

    median: number,

    thirdQuartile: number,

    interQuartileRange: number,

    max: number,

    lowerFenceOne: number,

    lowerFenceTwo: number,

    upperFenceOne: number,

    upperFenceTwo: number
  );
  constructor(
    min?: number,

    firstQuartile?: number,

    median?: number,

    thirdQuartile?: number,

    interQuartileRange?: number,

    max?: number,

    lowerFenceOne?: number,

    lowerFenceTwo?: number,

    upperFenceOne?: number,

    upperFenceTwo?: number
  ) {
    this.firstQuartile = firstQuartile;
    this.interQuartileRange = interQuartileRange;
    this.max = max;
    this.median = median;
    this.min = min;
    this.thirdQuartile = thirdQuartile;
    this.lowerFenceOne = lowerFenceOne;
    this.lowerFenceTwo = lowerFenceTwo;
    this.upperFenceOne = upperFenceOne;
    this.upperFenceTwo = upperFenceTwo;
  }
}
