export default class HttpTableData {
  public uri: string;

  public httpMethod: string;

  public responseAvg: number;

  public response25Percentile: number;

  public response50Percentile: number;

  public response75Percentile: number;

  public responseMax: number;

  public failCount: number;

  public successFailPercentage: number;

  public reqPerSec: number;

  public dataReference: string;

  constructor(
    uri: string,
    httpMethod: string,
    responseAvg: number,
    response25Percentile: number,
    response50Percentile: number,
    response75Percentile: number,
    responseMax: number,
    failCount: number,
    successFailPercentage: number,
    reqPerSec: number,
    dataReference: string
  ) {
    this.uri = uri;
    this.httpMethod = httpMethod;
    this.responseAvg = responseAvg;
    this.response25Percentile = response25Percentile;
    this.response50Percentile = response50Percentile;
    this.response75Percentile = response75Percentile;
    this.responseMax = responseMax;
    this.failCount = failCount;
    this.successFailPercentage = successFailPercentage;
    this.reqPerSec = reqPerSec;
    this.dataReference = dataReference;
  }
}
