/* eslint-disable max-classes-per-file */

import { HttpTableData } from './http-table-data';

export class Re {
  routesArray: Routes[];

  public id : number;

  public testPlanName: string;

  public loops: number;

  public duration: number;

  public threads: number;

  public rampUp: number;

  public followRedirects: boolean;

  public resultsummaries: HttpTableData [];
}

class Routes {
  httpRepsonseArray: HTTPResponse[];
}

class HTTPResponse {
}
