import { ResultSummary } from '../../models/result-summary';

export interface DashboardState {
  graphDataArray: GraphData[];
  resultSummaries: ResultSummary[];
}

export interface GraphData {
  name: string;
  series: Array<GraphDataObject>;
}

export interface GraphDataObject {
  timeStamp: string;
  elapsed: number;
  responseCode: string;
}
