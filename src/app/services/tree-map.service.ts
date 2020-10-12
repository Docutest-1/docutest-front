import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultSummary } from '../models/result-summary';
import { SwaggerSummary } from '../models/swagger-summary';

@Injectable({
  providedIn: 'root'
})
export class TreeMapService {
  private treeMapDataSource = new BehaviorSubject(null);

  private currentDashDataSource = new BehaviorSubject(null);

  treeMapData: Observable<SwaggerSummary> = this.treeMapDataSource.asObservable();

  currentDashData: Observable<ResultSummary[]> = this.currentDashDataSource.asObservable();

  async updateData() {
    const responseData = await this.http.get<SwaggerSummary>('http://localhost:8083/Docutest/swaggersummary/22').toPromise();
    this.treeMapDataSource.next(responseData);
  }

  changeCurrentDashdata(resultSummaryArray: ResultSummary[]) {
    this.currentDashDataSource.next(resultSummaryArray);
  }

  constructor(private http : HttpClient) {

  }
}
