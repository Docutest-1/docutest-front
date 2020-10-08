import { createAction, props } from '@ngrx/store';
import { ResultSummary } from 'src/app/models/result-summary';
import { GraphData } from './dashboard-data.model';

export const ADD_GRAPH_DATA = createAction(
  '[GraphData] Add Graph Data Object',
  props<{ graphData: GraphData }>()
);
export const REMOVE_GRAPH_DATA = createAction(
  '[GraphData] Remove Graph Data Object',
  props<{ graphData: GraphData }>()
);
export const RESET_GRAPH_DATA = createAction('[GraphData] Clear all data');

export const ADD_RESULT_SUMMARY = createAction(
  '[Dashboard] Add Result Summary Object',
  props<{ resultSummary: ResultSummary }>()
);

export const ADD_RESULT_SUMMARIES = createAction(
  '[Dashboard] Add Result Summary Array',
  props<{ resultSummaryArray: ResultSummary[] }>()
);

export const REMOVE_RESULT_SUMMARY = createAction(
  '[Dashboard] Remove Result Summary Object',
  props<{ resultSummary: ResultSummary }>()
);

export const RESET_RESULT_SUMMARIES = createAction('[Result Summary] Clear all data');
