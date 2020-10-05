export interface GraphDataArray {
  dataArray: Array<GraphData>;
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
