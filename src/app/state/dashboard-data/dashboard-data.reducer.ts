import { Action, createReducer, on } from '@ngrx/store';
import { DashboardState } from './dashboard-data.model';
import * as GraphDataActions from './dashboard-data.actions';

const initialState: DashboardState = {
  graphDataArray: [],
  resultSummaries: []
};

const dashboardDataReducer = createReducer(
  initialState,
  on(GraphDataActions.ADD_GRAPH_DATA,
    (state, { graphData }) => (
      {
        graphDataArray: [...state.graphDataArray, graphData],
        resultSummaries: [...state.resultSummaries]
      }
    )),

  on(GraphDataActions.ADD_RESULT_SUMMARY,
    (state, { resultSummary }) => (
      {
        graphDataArray: [...state.graphDataArray],
        resultSummaries: [...state.resultSummaries, resultSummary]
      }
    )),

  on(GraphDataActions.ADD_RESULT_SUMMARIES,
    (state, { resultSummaryArray }) => (
      {
        graphDataArray: [...state.graphDataArray],
        resultSummaries: [...state.resultSummaries, ...resultSummaryArray]
      }
    )),
  on(GraphDataActions.RESET_RESULT_SUMMARIES, (state) => (
    {
      graphDataArray: [...state.graphDataArray],
      resultSummaries: []
    }
  ))
);

export function reducer(state: DashboardState | undefined, action: Action) {
  return dashboardDataReducer(state, action);
}
