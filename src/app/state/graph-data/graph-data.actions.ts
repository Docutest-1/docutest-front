import { createAction, props } from '@ngrx/store';
import { GraphData } from './graph-data.model';

export const ADD_DATA = createAction(
  '[GraphData] Add Data Object',
  props<{ graphData: GraphData }>()
);
export const REMOVE_DATA = createAction(
  '[GraphData] Remove Data Object',
  props<{ graphData: GraphData }>()
);
export const RESET_DATA = createAction('[GraphData] Clear all data');
