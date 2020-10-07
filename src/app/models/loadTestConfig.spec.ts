import { LoadTestConfig } from './loadTestConfig';

describe('LoadTestConfig', () => {
  it('should create an instance', () => {
    expect(new LoadTestConfig('Default', 0, 10, 10, 10, true)).toBeTruthy();
  });
});
