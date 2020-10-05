import { Action, createReducer, on } from '@ngrx/store';
import { GraphData } from './graph-data.model';
import * as GraphDataActions from './graph-data.actions';

const initialState = [];

const graphDataReducer = createReducer(
  initialState,
  on(GraphDataActions.ADD_DATA, (state, { graphData }) => [...state, graphData])
);

export function reducer(state: GraphData[] | undefined, action: Action) {
  return graphDataReducer(state, action);
}
