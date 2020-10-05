export default class loadTestConfig {
    testPlanName: string;
    loops: number;
    durations: number;
    threads: number;
    rampUp: number;

    public constructor(testPlanName: string, loops: number, durations: number, threads: number, rampUp: number) {
        this.testPlanName = testPlanName;
        this.loops = loops;
        this.durations = durations;
        this.threads = threads;
        this.rampUp = rampUp;
    }
}
