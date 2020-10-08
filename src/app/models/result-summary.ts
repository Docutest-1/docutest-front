export class ResultSummary {
  id: number;

  uri: string;

  httpMethod: string;

  response25Percentile: number;

  response50Percentile: number;

  responseAvg: number;

  response75Percentile: number;

  responseMax: number;

  failCount: number;

  successFailPercentage: number;

  reqPerSec: number;

  dataReference: string;

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
}
