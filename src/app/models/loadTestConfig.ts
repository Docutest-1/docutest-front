export default class LoadTestConfig {
  testPlanName: string;

  loops: number;

  duration: number;

  threads: number;

  rampUp: number;

  public constructor(
    testPlanName: string,
    loops: number,
    duration: number,
    threads: number,
    rampUp: number,
  ) {
    this.testPlanName = testPlanName;
    this.loops = loops;
    this.duration = duration;
    this.threads = threads;
    this.rampUp = rampUp;
  }
}
