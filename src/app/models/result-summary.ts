export class ResultSummary {
  dataReference: string;

  failCount: number;

  httpMethod: string;

  id: number;

  reqPerSec: number;

  response25Percentile: number;

  response50Percentile: number;

  response75Percentile: number;

  responseAvg: number;

  responseMax: number;

  successFailPercentage: number;

  uri: string;

  // dataReference: null
  // failCount: 0
  // httpMethod: "GET"
  // id: 1
  // reqPerSec: 9.097525473071325
  // response25Percentile: 274
  // response50Percentile: 389
  // response75Percentile: 602
  // responseAvg: 648
  // responseMax: 7769
  // successFailPercentage: 100
  // uri: "http://blazedemo

  constructor();
  constructor(
    id: number,
    uri: string,
    httpMethod: string,
    response25Percentile: number,
    response50Percentile: number,
    responseAvg: number,
    response75Percentile: number,
    responseMax: number,
    failCount: number,
    successFailPercentage: number,
    reqPerSec: number,
    dataReference: string,
  );
  constructor(
    id?: number,
    uri?: string,
    httpMethod?: string,
    response25Percentile?: number,
    response50Percentile?: number,
    responseAvg?: number,
    response75Percentile?: number,
    responseMax?: number,
    failCount?: number,
    successFailPercentage?: number,
    reqPerSec?: number,
    dataReference?: string,
  ) {
    this.id = id;
    this.uri = uri;
    this.httpMethod = httpMethod;
    this.response25Percentile = response25Percentile;
    this.response50Percentile = response50Percentile;
    this.responseAvg = responseAvg;
    this.response75Percentile = response75Percentile;
    this.responseMax = responseMax;
    this.failCount = failCount;
    this.successFailPercentage = successFailPercentage;
    this.reqPerSec = reqPerSec;
    this.dataReference = dataReference;
  }

  // public setName() {
  //   this.name = this.uri;
  // }
}
