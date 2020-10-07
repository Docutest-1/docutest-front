export class LoadTestConfig {
  testPlanName: string;

  loops: number;

  duration: number;

  threads: number;

  rampUp: number;

  followRedirects: boolean;

  public constructor(
    testPlanName: string,
    loops: number,
    duration: number,
    threads: number,
    rampUp: number,
    followRedirects: boolean,
  ) {
    this.testPlanName = testPlanName;
    this.loops = loops;
    this.duration = duration;
    this.threads = threads;
    this.rampUp = rampUp;
    this.followRedirects = followRedirects;
  }
}
