import { ResultSummary } from './result-summary';

export class SwaggerSummary {
  id: number;

  testPlanName: string;

  loops: number;

  duration: number;

  threads: number;

  rampUp: number;

  followRedirects: boolean;

  resultsummaries: ResultSummary[];

  constructor();
  constructor(
    id: number,
    testPlanName: string,
    loops: number,
    duration: number,
    threads: number,
    rampUp: number,
    followedRedirects: boolean,
    resultsummaries: ResultSummary[],
  );
  constructor(
    id?: number,
    testPlanName?: string,
    loops?: number,
    duration?: number,
    threads?: number,
    rampUp?: number,
    followedRedirects?: boolean,
    resultsummaries?: ResultSummary[],
  ) {
    this.id = id;
    this.testPlanName = testPlanName;
    this.loops = loops;
    this.duration = duration;
    this.threads = threads;
    this.rampUp = rampUp;
    this.followRedirects = followedRedirects;
    this.resultsummaries = resultsummaries;
  }
}
