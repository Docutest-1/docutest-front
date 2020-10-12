import { ResultSummary } from './result-summary';

export class TreeMapData {
  name: string;

  children: ResultSummary[];

  constructor();
  constructor(
    name: string,
    children: ResultSummary[]
  );
  constructor(
    name?:string,
    children?:ResultSummary[]
  ) {
    this.name = name;
    this.children = children;
  }
}
