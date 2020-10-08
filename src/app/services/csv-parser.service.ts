import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';

// ngRx
import { Store } from '@ngrx/store';
import { ADD_GRAPH_DATA } from '../state/dashboard-data/dashboard-data.actions';

@Injectable({
  providedIn: 'root',
})
export class CsvParserService {
  editedResults = [];

  constructor(private papa: Papa, private store: Store) {}

  readCsv(csvFile): void {
    const options = {
      complete: (results, file) => {
        // Tells store to run update data function and provides a GraphData object
        const newResults = this.editResults(results);
        this.store.dispatch(
          ADD_GRAPH_DATA({
            graphData: {
              name: file.name,
              series: newResults,
            },
          })
        );
      },
      dynamicTyping: true,
      header: true,
      transformHeader: function transformHeader(h): string {
        if (h === 'timeStamp') {
          return 'name';
        }
        if (h === 'elapsed') {
          return 'value';
        }
        return h;
      },
    };
    this.papa.parse(csvFile, options);
  }

  editResults(results): any[] {
    const totalResults = results.data.length;
    const aggStep: number = totalResults / 100;
    // let aggStepRem: number = totalResults % 10;

    if (aggStep >= 2) {
      // Function adds aggregate results to Edited results such that the length
      // of edited results is always equaivalent to 100 plus a small remainder
      this.addAggregateResultsToEditedResults(results, totalResults, aggStep);
      return this.editedResults;
    }

    // Function just adds them directly to the edited results array with out doing any aggregation
    this.addResultsToEditedResults(results);
    return this.editedResults;
  }

  addResultsToEditedResults(results): void {
    results.data.forEach((element: ExampleResultObject) => {
      this.editedResults.push({
        name: element.name.toString(),
        value: element.value,
        responseCode: element.responseCode,
      });
    });
  }

  addAggregateResultsToEditedResults(results, totalResults, aggStep): void {
    for (let i = 0; i < totalResults; i += aggStep) {
      const resultObject = {
        name: `Results ${i}-${i + aggStep - 1}`,
        value: 0,
        successfulHTTPStatusCodes: 0,
      };
      for (let j = 0; j < aggStep; j += 1) {
        const currResponseObject = results.data[i + j];
        const val = currResponseObject.value;
        resultObject.value += val;
        if (currResponseObject.responseCode === 200) {
          resultObject.successfulHTTPStatusCodes += 1;
        }
      }
      resultObject.value /= aggStep;
      this.editedResults.push(resultObject);
    }
  }
}

interface ExampleResultObject {
  name: number;
  responseCode: number;
  value: string;
}
